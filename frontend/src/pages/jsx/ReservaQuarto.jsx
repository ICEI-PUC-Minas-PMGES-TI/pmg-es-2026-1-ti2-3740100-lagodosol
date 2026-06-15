import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AlertMessage from "./AlertMessage";
import "../style/ReservaQuarto.css";
import Quarto1 from "../../assets/Quarto1.jpg";
import Quarto2 from "../../assets/Quarto2.jpg";
import Quarto3 from "../../assets/Quarto3.jpg";
import Quarto4 from "../../assets/Quarto4.jpg";

function ReservaQuarto() {
  const navigate = useNavigate();

  const quartos = [
    {
      id: 101,
      nome: "101 - Standard",
      preco: 150,
      cama: "1 cama de casal",
      pessoas: "2 pessoas",
      imagem: Quarto1,
    },
    {
      id: 102,
      nome: "102 - Standard",
      preco: 150,
      cama: "2 camas de solteiro",
      pessoas: "2 pessoas",
      imagem: Quarto2,
    },
    {
      id: 201,
      nome: "201 - Luxo",
      preco: 220,
      cama: "1 cama king",
      pessoas: "2 pessoas",
      imagem: Quarto3,
    },
    {
      id: 301,
      nome: "301 - Suíte",
      preco: 300,
      cama: "1 cama king",
      pessoas: "2 pessoas",
      imagem: Quarto4,
    },
  ];

  const [dadosReserva, setDadosReserva] = useState({
    checkIn: "",
    checkOut: "",
    hospedes: "1 hóspede",
    tipo: "",
    observacoes: "",
  });

  const [quartoSelecionado, setQuartoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [alerta, setAlerta] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setDadosReserva((prev) => ({ ...prev, [name]: value }));
    setAlerta(null);
  }

  function calcularDiarias() {
    if (!dadosReserva.checkIn || !dadosReserva.checkOut) return 0;
    const entrada = new Date(dadosReserva.checkIn);
    const saida = new Date(dadosReserva.checkOut);
    const diff = saida - entrada;
    if (diff <= 0) return 0;
    return diff / (1000 * 60 * 60 * 24);
  }

  const diarias = calcularDiarias();
  const valorTotal =
    quartoSelecionado && diarias > 0 ? diarias * quartoSelecionado.preco : 0;

  const isDataValida =
    dadosReserva.checkIn &&
    dadosReserva.checkOut &&
    new Date(dadosReserva.checkOut) > new Date(dadosReserva.checkIn);

  const podeFinalizar = isDataValida && quartoSelecionado;

  async function handleFinalizar() {
    if (!podeFinalizar) return;

    setCarregando(true);
    setAlerta(null);

    try {
      const response = await fetch("http://localhost:8081/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quartoId: quartoSelecionado.id,
          nomeQuarto: quartoSelecionado.nome,
          checkIn: dadosReserva.checkIn,
          checkOut: dadosReserva.checkOut,
          hospedes: dadosReserva.hospedes,
          tipo: dadosReserva.tipo,
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
                <select
                  name="hospedes"
                  value={dadosReserva.hospedes}
                  onChange={handleChange}
                >
                  <option>1 hóspede</option>
                  <option>2 hóspedes</option>
                  <option>3 hóspedes</option>
                  <option>4 hóspedes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de hospedagem</label>
                <select
                  name="tipo"
                  value={dadosReserva.tipo}
                  onChange={handleChange}
                >
                  <option value="">Selecione o tipo</option>
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
                  ? quartoSelecionado.nome
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
          <h2>Quartos Disponíveis</h2>

          <div className="quartos-grid">
            {quartos.map((quarto) => (
              <div
                className="quarto-card"
                key={quarto.id}
                style={{
                  border:
                    quartoSelecionado?.id === quarto.id
                      ? "2px solid #1a5276"
                      : "2px solid transparent",
                }}
              >
                <img src={quarto.imagem} alt={quarto.nome} />

                <div className="quarto-info">
                  <h3>{quarto.nome}</h3>
                  <p>{quarto.cama}</p>
                  <p>{quarto.pessoas}</p>

                  <div className="quarto-footer">
                    <strong>
                      R$ {quarto.preco.toFixed(2).replace(".", ",")}
                    </strong>

                    <button
                      onClick={() => {
                        setQuartoSelecionado(quarto);
                        setAlerta(null);
                      }}
                      style={{
                        background:
                          quartoSelecionado?.id === quarto.id
                            ? "#1a5276"
                            : undefined,
                      }}
                    >
                      {quartoSelecionado?.id === quarto.id
                        ? "✓ Selecionado"
                        : "Selecionar quarto"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReservaQuarto;
