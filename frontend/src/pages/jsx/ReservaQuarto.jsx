import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AlertMessage from "./AlertMessage";
import "../style/ReservaQuarto.css";

const API = "http://localhost:8081";

function dataSegura(valor) {
  if (!valor) return null;
  const data = new Date(`${valor}T12:00:00`);
  return Number.isNaN(data.getTime()) ? null : data;
}

function reservaCancelada(reserva) {
  const status = String(reserva.status || reserva.situacao || reserva.estado || "").toLowerCase();
  return ["cancelada", "cancelado", "cancelled"].includes(status);
}

function reservasSobrepoem(checkIn, checkOut, reserva) {
  const inicioSelecionado = dataSegura(checkIn);
  const fimSelecionado = dataSegura(checkOut);
  const inicioReserva = dataSegura(reserva.checkIn);
  const fimReserva = dataSegura(reserva.checkOut);

  if (!inicioSelecionado || !fimSelecionado || !inicioReserva || !fimReserva) return false;

  return inicioSelecionado < fimReserva && fimSelecionado > inicioReserva;
}

function extrairNumeroHospedes(valor) {
  const numero = Number.parseInt(String(valor).replace(/\D/g, ""), 10);
  return Number.isFinite(numero) ? numero : 1;
}

function ReservaQuarto() {
  const navigate = useNavigate();

  const [quartosDB, setQuartosDB] = useState([]);
  const [reservasDB, setReservasDB] = useState([]);
  const [dadosReserva, setDadosReserva] = useState({
    checkIn: "",
    checkOut: "",
    hospedes: "1 hóspede",
    tipo: "",
    observacoes: "",
  });
  const [quartoSelecionado, setQuartoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      setCarregandoDados(true);

      try {
        const [resQuartos, resReservas] = await Promise.all([
          fetch(`${API}/quartos`),
          fetch(`${API}/reservas`),
        ]);

        if (!resQuartos.ok || !resReservas.ok) {
          throw new Error("Não foi possível carregar quartos e reservas.");
        }

        const [quartos, reservas] = await Promise.all([
          resQuartos.json(),
          resReservas.json(),
        ]);

        setQuartosDB(Array.isArray(quartos) ? quartos : []);
        setReservasDB(Array.isArray(reservas) ? reservas : []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setAlerta({
          type: "error",
          title: "Falha ao carregar dados",
          message: "Verifique se o backend está rodando e tente novamente.",
        });
      } finally {
        setCarregandoDados(false);
      }
    }

    carregarDados();
  }, []);

  const diarias = useMemo(() => {
    const entrada = dataSegura(dadosReserva.checkIn);
    const saida = dataSegura(dadosReserva.checkOut);
    if (!entrada || !saida) return 0;

    const diff = saida - entrada;
    if (diff <= 0) return 0;
    return diff / (1000 * 60 * 60 * 24);
  }, [dadosReserva.checkIn, dadosReserva.checkOut]);

  const isDataValida =
    dadosReserva.checkIn &&
    dadosReserva.checkOut &&
    dataSegura(dadosReserva.checkOut) > dataSegura(dadosReserva.checkIn);

  const quartosFiltrados = useMemo(() => {
    const hospedes = extrairNumeroHospedes(dadosReserva.hospedes);

    return quartosDB.filter((quarto) => {
      const bateTipo = dadosReserva.tipo
        ? quarto.tipo?.toLowerCase().includes(dadosReserva.tipo.toLowerCase())
        : true;
      const comportaHospedes = Number(quarto.capacidade || 0) >= hospedes;
      const indisponivelNoPeriodo =
        isDataValida &&
        reservasDB.some(
          (reserva) =>
            !reservaCancelada(reserva) &&
            reserva.quartoId === quarto.id &&
            reservasSobrepoem(dadosReserva.checkIn, dadosReserva.checkOut, reserva),
        );

      return bateTipo && comportaHospedes && !indisponivelNoPeriodo;
    });
  }, [quartosDB, reservasDB, dadosReserva, isDataValida]);

  const quartosIndisponiveis = useMemo(() => {
    if (!isDataValida) return 0;
    return quartosDB.length - quartosFiltrados.length;
  }, [quartosDB.length, quartosFiltrados.length, isDataValida]);

  const valorTotal = quartoSelecionado && diarias > 0 ? diarias * quartoSelecionado.preco : 0;
  const podeFinalizar = isDataValida && quartoSelecionado;

  useEffect(() => {
    if (!quartoSelecionado) return;

    const aindaDisponivel = quartosFiltrados.some((quarto) => quarto.id === quartoSelecionado.id);
    if (!aindaDisponivel) {
      setQuartoSelecionado(null);
    }
  }, [quartosFiltrados, quartoSelecionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDadosReserva((prev) => ({ ...prev, [name]: value }));
    setAlerta(null);
  }

  async function handleFinalizar() {
    if (!podeFinalizar) {
      setAlerta({
        type: "error",
        title: "Reserva incompleta",
        message: "Informe datas válidas e selecione um quarto disponível.",
      });
      return;
    }

    setCarregando(true);
    setAlerta(null);

    try {
      const response = await fetch(`${API}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quartoId: quartoSelecionado.id,
          nomeQuarto: `${quartoSelecionado.numero} - ${quartoSelecionado.tipo}`,
          checkIn: dadosReserva.checkIn,
          checkOut: dadosReserva.checkOut,
          hospedes: dadosReserva.hospedes,
          tipo: quartoSelecionado.tipo,
          observacoes: dadosReserva.observacoes,
          valorTotal: valorTotal,
        }),
      });

      if (!response.ok) {
        setAlerta({
          type: "error",
          title: "Erro ao realizar reserva",
          message: "Tente novamente em alguns instantes.",
        });
        return;
      }

      setAlerta({
        type: "success",
        title: "Reserva realizada com sucesso",
        message: "Você será redirecionado para o pagamento.",
      });
      setTimeout(() => navigate("/pagamento"), 1200);
    } catch (error) {
      console.error("Erro:", error);
      setAlerta({
        type: "error",
        title: "Falha na comunicação",
        message: "Verifique se o backend está rodando e tente novamente.",
      });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="reserva-wrapper">
      <div className="logo-reserva">
        <img src={logo} alt="Logo Lago do Sol" />
      </div>

      <main className="reserva-container">
        <div className="reserva-grid">
          <div className="card-reserva form-card">
            <h2>Dados da Reserva</h2>

            <AlertMessage
              type={alerta?.type}
              title={alerta?.title}
              message={alerta?.message}
              onClose={() => setAlerta(null)}
            />

            <div className="form-row">
              <div className="form-group">
                <label>Check-in</label>
                <input
                  type="date"
                  name="checkIn"
                  value={dadosReserva.checkIn}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Check-out</label>
                <input
                  type="date"
                  name="checkOut"
                  value={dadosReserva.checkOut}
                  onChange={handleChange}
                  min={dadosReserva.checkIn || undefined}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Número de hóspedes</label>
                <select name="hospedes" value={dadosReserva.hospedes} onChange={handleChange}>
                  <option>1 hóspede</option>
                  <option>2 hóspedes</option>
                  <option>3 hóspedes</option>
                  <option>4 hóspedes</option>
                </select>
              </div>
              <div className="form-group">
                <label>Filtrar por tipo</label>
                <select name="tipo" value={dadosReserva.tipo} onChange={handleChange}>
                  <option value="">Todos os tipos</option>
                  <option>Standard</option>
                  <option>Luxo</option>
                  <option>Suíte</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Observações</label>
              <textarea
                name="observacoes"
                placeholder="Alguma observação sobre sua reserva?"
                value={dadosReserva.observacoes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="card-reserva resumo-card">
            <h2>Resumo da Reserva</h2>

            <div className="resumo-item">
              <span>Check-in</span>
              <strong>{dadosReserva.checkIn || "Não informado"}</strong>
            </div>
            <div className="resumo-item">
              <span>Check-out</span>
              <strong>{dadosReserva.checkOut || "Não informado"}</strong>
            </div>
            <div className="resumo-item">
              <span>Diárias</span>
              <strong>{diarias}</strong>
            </div>
            <div className="resumo-item">
              <span>Hóspedes</span>
              <strong>{dadosReserva.hospedes}</strong>
            </div>
            <div className="resumo-item">
              <span>Quarto</span>
              <strong>
                {quartoSelecionado
                  ? `${quartoSelecionado.numero} - ${quartoSelecionado.tipo}`
                  : "Nenhum selecionado"}
              </strong>
            </div>
            <div className="resumo-total">
              <span>Valor Total</span>
              <strong>R$ {valorTotal.toFixed(2).replace(".", ",")}</strong>
            </div>

            <button
              className="btn-buscar"
              onClick={handleFinalizar}
              disabled={!podeFinalizar || carregando}
              style={{ marginTop: "20px", opacity: podeFinalizar ? 1 : 0.5 }}
            >
              {carregando ? "Salvando..." : "Finalizar Reserva"}
            </button>
          </div>
        </div>

        <div className="quartos-section">
          <h2>
            {isDataValida ? "Quartos Disponíveis" : "Quartos Cadastrados"}
            <span className="quartos-contador">
              {quartosFiltrados.length} encontrado{quartosFiltrados.length !== 1 ? "s" : ""}
              {quartosIndisponiveis > 0 && `, ${quartosIndisponiveis} indisponível(is) no período`}
            </span>
          </h2>

          {carregandoDados ? (
            <p className="quartos-vazio">Carregando quartos disponíveis...</p>
          ) : !isDataValida ? (
            <p className="quartos-aviso">
              Informe check-in e check-out para verificar a disponibilidade real.
            </p>
          ) : null}

          {!carregandoDados && quartosFiltrados.length === 0 ? (
            <p className="quartos-vazio">
              Nenhum quarto disponível para os filtros e período selecionados.
            </p>
          ) : (
            <div className="quartos-grid">
              {quartosFiltrados.map((quarto) => (
                <div
                  className="quarto-card"
                  key={quarto.id}
                  style={{
                    border: quartoSelecionado?.id === quarto.id ? "2px solid #1a5276" : "2px solid transparent",
                  }}
                >
                  {quarto.imagemBase64 ? (
                    <img src={quarto.imagemBase64} alt={`Quarto ${quarto.numero}`} />
                  ) : (
                    <div className="quarto-sem-imagem">
                      Sem imagem
                    </div>
                  )}

                  <div className="quarto-info">
                    <h3>Quarto {quarto.numero} - {quarto.tipo}</h3>
                    <p>Capacidade: {quarto.capacidade} pessoa(s)</p>

                    <div className="quarto-footer">
                      <strong>R$ {Number(quarto.preco).toFixed(2).replace(".", ",")}/noite</strong>
                      <button
                        onClick={() => { setQuartoSelecionado(quarto); setAlerta(null); }}
                        style={{ background: quartoSelecionado?.id === quarto.id ? "#1a5276" : undefined }}
                      >
                        {quartoSelecionado?.id === quarto.id ? "Selecionado" : "Selecionar quarto"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ReservaQuarto;
