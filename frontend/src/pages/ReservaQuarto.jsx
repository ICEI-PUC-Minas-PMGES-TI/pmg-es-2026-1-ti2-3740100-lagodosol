import { useState } from "react";
import logo from "../assets/logo.jpg";
import "./ReservaQuarto.css";

function ReservaQuarto() {
  const quartos = [
    {
      id: 101,
      nome: "101 - Standard",
      preco: 150,
      cama: "1 cama de casal",
      pessoas: "2 pessoas",
      imagem:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 102,
      nome: "102 - Standard",
      preco: 150,
      cama: "2 camas de solteiro",
      pessoas: "2 pessoas",
      imagem:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 201,
      nome: "201 - Luxo",
      preco: 220,
      cama: "1 cama king",
      pessoas: "2 pessoas",
      imagem:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 301,
      nome: "301 - Suíte",
      preco: 300,
      cama: "1 cama king",
      pessoas: "2 pessoas",
      imagem:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
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

  function handleChange(e) {
    const { name, value } = e.target;

    setDadosReserva((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    quartoSelecionado && diarias > 0
      ? diarias * quartoSelecionado.preco
      : 0;

  const isDataValida =
    dadosReserva.checkIn &&
    dadosReserva.checkOut &&
    new Date(dadosReserva.checkOut) > new Date(dadosReserva.checkIn);

  return (
    <div className="reserva-wrapper">
      <div className="logo-reserva">
        <img src={logo} alt="Logo Lago do Sol" />
      </div>

      <main className="reserva-container">
        <div className="reserva-grid">
          <div className="card-reserva form-card">
            <h2>Dados da Reserva</h2>

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

            <button className="btn-buscar" disabled={!isDataValida}>
              Buscar Quartos
            </button>
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
          </div>
        </div>

        <div className="quartos-section">
          <h2>Quartos Disponíveis</h2>

          <div className="quartos-grid">
            {quartos.map((quarto) => (
              <div className="quarto-card" key={quarto.id}>
                <img src={quarto.imagem} alt={quarto.nome} />

                <div className="quarto-info">
                  <h3>{quarto.nome}</h3>
                  <p>{quarto.cama}</p>
                  <p>{quarto.pessoas}</p>

                  <div className="quarto-footer">
                    <strong>
                      R$ {quarto.preco.toFixed(2).replace(".", ",")}
                    </strong>

                    <button onClick={() => setQuartoSelecionado(quarto)}>
                      Selecionar quarto
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