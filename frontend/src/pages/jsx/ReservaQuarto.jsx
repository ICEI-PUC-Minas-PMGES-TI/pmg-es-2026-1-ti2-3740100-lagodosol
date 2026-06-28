import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AlertMessage from "./AlertMessage";
import DatePickerReserva from "./DatePickerReserva";
import "../style/ReservaQuarto.css";

const API = "http://localhost:8081";

function dataSegura(valor) {
  if (!valor) return null;
  const data = new Date(`${valor}T12:00:00`);
  return Number.isNaN(data.getTime()) ? null : data;
}

function formatarData(valor) {
  const data = dataSegura(valor);
  return data ? data.toLocaleDateString("pt-BR") : "--";
}

function hojeISO() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function isoDoDia(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
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

// Gera o conjunto de dias (ISO) ocupados por um quarto específico,
// considerando todas as reservas ativas (não canceladas) dele.
function gerarDiasOcupados(reservas, quartoId) {
  const set = new Set();

  reservas
    .filter((r) => !reservaCancelada(r) && r.quartoId === quartoId)
    .forEach((reserva) => {
      const inicio = dataSegura(reserva.checkIn);
      const fim = dataSegura(reserva.checkOut);
      if (!inicio || !fim) return;

      // Marca todos os dias entre checkIn (inclusive) e checkOut (exclusive)
      // como ocupados — o dia do checkOut fica livre para outra entrada.
      const cursor = new Date(inicio);
      while (cursor < fim) {
        set.add(isoDoDia(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
    });

  return set;
}

function ReservaQuarto() {
  const navigate = useNavigate();
  const hoje = hojeISO();

  const usuarioLogado = localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario"))
    : null;

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

  // Controla o modal "Consultar datas reservadas"
  const [modalQuarto, setModalQuarto] = useState(null);

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

  // Fecha o modal com a tecla Esc
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setModalQuarto(null);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Dias ocupados do quarto atualmente selecionado (para desabilitar no calendário)
  const diasOcupadosSelecionado = useMemo(() => {
    if (!quartoSelecionado) return new Set();
    return gerarDiasOcupados(reservasDB, quartoSelecionado.id);
  }, [quartoSelecionado, reservasDB]);

  const diarias = useMemo(() => {
    const entrada = dataSegura(dadosReserva.checkIn);
    const saida = dataSegura(dadosReserva.checkOut);
    if (!entrada || !saida) return 0;

    const diff = saida - entrada;
    if (diff <= 0) return 0;
    return diff / (1000 * 60 * 60 * 24);
  }, [dadosReserva.checkIn, dadosReserva.checkOut]);

  const checkInNoPassado = useMemo(() => {
    if (!dadosReserva.checkIn) return false;
    return dadosReserva.checkIn < hoje;
  }, [dadosReserva.checkIn, hoje]);

  const isDataValida =
    dadosReserva.checkIn &&
    dadosReserva.checkOut &&
    !checkInNoPassado &&
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

  // Datas já reservadas do quarto que está aberto no modal
  const datasOcupadasDoModal = useMemo(() => {
    if (!modalQuarto) return [];

    return reservasDB
      .filter(
        (reserva) =>
          !reservaCancelada(reserva) && reserva.quartoId === modalQuarto.id
      )
      .map((reserva) => ({
        checkIn: reserva.checkIn,
        checkOut: reserva.checkOut,
      }))
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  }, [modalQuarto, reservasDB]);

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

  // Quando o check-in muda pelo calendário, garante que o check-out
  // não fique antes ou igual a ele
  function handleCheckInChange(novoCheckIn) {
    setDadosReserva((prev) => ({
      ...prev,
      checkIn: novoCheckIn,
      checkOut:
        prev.checkOut && prev.checkOut <= novoCheckIn ? "" : prev.checkOut,
    }));
    setAlerta(null);
  }

  function handleCheckOutChange(novoCheckOut) {
    setDadosReserva((prev) => ({ ...prev, checkOut: novoCheckOut }));
    setAlerta(null);
  }

  // Mínimo do check-out: o dia seguinte ao check-in
  const minCheckOut = useMemo(() => {
    if (!dadosReserva.checkIn) return hoje;
    const proximoDia = dataSegura(dadosReserva.checkIn);
    proximoDia.setDate(proximoDia.getDate() + 1);
    return isoDoDia(proximoDia);
  }, [dadosReserva.checkIn, hoje]);

  async function handleFinalizar() {
    if (!podeFinalizar) {
      setAlerta({
        type: "error",
        title: "Reserva incompleta",
        message: "Informe datas válidas (não no passado) e selecione um quarto disponível.",
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
          usuarioId: usuarioLogado?.id ?? null,
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

      const novaReserva = await response.json();
      setReservasDB((prev) => [...prev, novaReserva]);

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
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginBottom: "16px",
            padding: "8px 16px",
            background: "#0d5c63",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ← Voltar para Home
        </button>

        <div className="reserva-grid">
          <div className="card-reserva form-card">
            <h2>Dados da Reserva</h2>

            <AlertMessage
              type={alerta?.type}
              title={alerta?.title}
              message={alerta?.message}
              onClose={() => setAlerta(null)}
            />

            {quartoSelecionado && (
              <p className="aviso-calendario-quarto">
                Mostrando disponibilidade do quarto{" "}
                <strong>{quartoSelecionado.numero} - {quartoSelecionado.tipo}</strong>.
                Selecione um quarto abaixo para ver as datas livres antes de
                escolher o período.
              </p>
            )}

            <div className="form-row">
              <div className="form-group">
                <DatePickerReserva
                  label="Check-in"
                  valueISO={dadosReserva.checkIn}
                  onChange={handleCheckInChange}
                  minDateISO={hoje}
                  disabledISOSet={diasOcupadosSelecionado}
                  placeholder="Selecione o check-in"
                />
              </div>
              <div className="form-group">
                <DatePickerReserva
                  label="Check-out"
                  valueISO={dadosReserva.checkOut}
                  onChange={handleCheckOutChange}
                  minDateISO={minCheckOut}
                  disabledISOSet={diasOcupadosSelecionado}
                  placeholder="Selecione o check-out"
                  disabled={!dadosReserva.checkIn}
                />
              </div>
            </div>

            {checkInNoPassado && (
              <p className="aviso-data-invalida">
                A data de check-in não pode ser no passado.
              </p>
            )}

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
              <strong>{dadosReserva.checkIn ? formatarData(dadosReserva.checkIn) : "Não informado"}</strong>
            </div>
            <div className="resumo-item">
              <span>Check-out</span>
              <strong>{dadosReserva.checkOut ? formatarData(dadosReserva.checkOut) : "Não informado"}</strong>
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
              {quartosFiltrados.map((quarto) => {
                const reservasDoQuarto = reservasDB.filter(
                  (r) => !reservaCancelada(r) && r.quartoId === quarto.id
                );

                return (
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

                      <button
                        type="button"
                        className="link-consultar-datas"
                        onClick={() => setModalQuarto(quarto)}
                      >
                        Ver datas reservadas{reservasDoQuarto.length > 0 && ` (${reservasDoQuarto.length})`}
                      </button>

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
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ── MODAL: Consultar datas reservadas ── */}
      {modalQuarto && (
        <div className="modal-overlay" onClick={() => setModalQuarto(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                Datas reservadas — Quarto {modalQuarto.numero} ({modalQuarto.tipo})
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setModalQuarto(null)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {datasOcupadasDoModal.length === 0 ? (
                <p className="modal-vazio">
                  Este quarto não possui nenhuma reserva registrada.
                </p>
              ) : (
                <ul className="modal-lista-datas">
                  {datasOcupadasDoModal.map((periodo, index) => (
                    <li key={index}>
                      <span className="modal-data-icone">📌</span>
                      <span>
                        {formatarData(periodo.checkIn)} → {formatarData(periodo.checkOut)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-fechar-modal"
                onClick={() => setModalQuarto(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservaQuarto;
