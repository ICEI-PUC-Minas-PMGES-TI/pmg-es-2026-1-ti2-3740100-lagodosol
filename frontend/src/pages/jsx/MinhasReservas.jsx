import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/MinhasReservas.css";

const API = "https://pmg-es-2026-1-ti2-3740100-lagodosol.onrender.com";

function MinhasReservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [avaliando, setAvaliando] = useState(null);

  const usuarioLogado = localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario"))
    : null;

  useEffect(() => {
    async function carregarReservas() {
      if (!usuarioLogado?.id) {
        setErro("Você precisa estar logado para ver suas reservas.");
        setCarregando(false);
        return;
      }

      try {
        const response = await fetch(
          `${API}/reservas/usuario/${usuarioLogado.id}`,
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar reservas.");
        }

        const data = await response.json();
        setReservas(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarReservas();
  }, []);

  function isReservaConcluida(reserva) {
    if (!reserva.checkOut) {
      return false;
    }

    const dataCheckOut = new Date(reserva.checkOut);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataCheckOut.setHours(0, 0, 0, 0);

    return dataCheckOut < hoje;
  }

  function formatarData(data) {
    if (!data) return "--";
    const d = new Date(`${data}T12:00:00`);
    return Number.isNaN(d.getTime()) ? data : d.toLocaleDateString("pt-BR");
  }

  function formatarDataCurta(data) {
    if (!data) return { dia: "--", mes: "" };
    const d = new Date(`${data}T12:00:00`);
    if (Number.isNaN(d.getTime())) return { dia: "--", mes: "" };
    const dia = d.getDate();
    const mes = d
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "");
    return { dia, mes };
  }

  function calcularNoites(checkIn, checkOut) {
    const inicio = new Date(`${checkIn}T12:00:00`);
    const fim = new Date(`${checkOut}T12:00:00`);
    if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()))
      return null;
    const diff = (fim - inicio) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : null;
  }

  async function avaliarReserva(id, estrelas) {
    setAvaliando(id);
    try {
      const reserva = reservas.find((item) => item.id === id);
      if (!reserva) {
        throw new Error("Reserva não encontrada.");
      }

      const payload = {
        avaliacao: estrelas,
      };

      const response = await fetch(`${API}/reservas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Não foi possível salvar a avaliação.");
      }

      const reservaAtualizada = await response.json();
      setReservas((prev) =>
        prev.map((item) => (item.id === id ? reservaAtualizada : item)),
      );
    } catch (error) {
      setErro(error.message);
    } finally {
      setAvaliando(null);
    }
  }

  function renderStars(rating = 0, onRate) {
    return [1, 2, 3, 4, 5].map((value) => (
      <span
        key={value}
        className={`star ${value <= rating ? "filled" : ""} ${
          onRate ? "clickable" : ""
        }`}
        onClick={() => onRate && onRate(value)}
      >
        {value <= rating ? "★" : "☆"}
      </span>
    ));
  }

  const reservasAtivas = reservas.filter(
    (reserva) => !isReservaConcluida(reserva),
  );
  const reservasConcluidas = reservas.filter(isReservaConcluida);

  function CardReserva({ reserva, concluida }) {
    const entrada = formatarDataCurta(reserva.checkIn);
    const saida = formatarDataCurta(reserva.checkOut);
    const noites = calcularNoites(reserva.checkIn, reserva.checkOut);

    return (
      <div
        className={`reserva-card ${concluida ? "reserva-card-concluida" : ""}`}
      >
        <div className="reserva-card-faixa" />

        <div className="reserva-card-topo">
          <div className="reserva-card-titulo">
            <h3>{reserva.nomeQuarto || "Reserva"}</h3>
            {reserva.tipo && (
              <span className="reserva-card-tag">{reserva.tipo}</span>
            )}
          </div>

          <span
            className={`reserva-card-status ${concluida ? "status-concluida" : "status-ativa"}`}
          >
            {concluida ? "Concluída" : "Ativa"}
          </span>
        </div>

        <div className="reserva-card-datas">
          <div className="reserva-data-bloco">
            <span className="reserva-data-label">Check-in</span>
            <div className="reserva-data-caixa">
              <strong>{entrada.dia}</strong>
              <span>{entrada.mes}</span>
            </div>
          </div>

          <div className="reserva-data-seta">
            {noites !== null && (
              <span className="reserva-noites-chip">
                {noites} noite{noites !== 1 ? "s" : ""}
              </span>
            )}
            <span className="reserva-seta-linha" />
          </div>

          <div className="reserva-data-bloco">
            <span className="reserva-data-label">Check-out</span>
            <div className="reserva-data-caixa">
              <strong>{saida.dia}</strong>
              <span>{saida.mes}</span>
            </div>
          </div>
        </div>

        <div className="reserva-card-rodape">
          <span className="reserva-card-valor">
            {reserva.valorTotal
              ? `R$ ${Number(reserva.valorTotal).toFixed(2).replace(".", ",")}`
              : "Valor não informado"}
          </span>
        </div>

        {concluida && (
          <div className="rating-card">
            <p className="rating-titulo">Avaliação da estadia</p>

            <div className="rating-stars">
              {reserva.avaliacao ? (
                <>
                  {renderStars(reserva.avaliacao)}
                  <span className="rating-value">{reserva.avaliacao} de 5</span>
                </>
              ) : (
                <>
                  {renderStars(reserva.avaliacao || 0, (value) =>
                    avaliarReserva(reserva.id, value),
                  )}
                  <span className="rating-help">
                    Clique nas estrelas para avaliar
                  </span>
                </>
              )}
            </div>

            {avaliando === reserva.id && (
              <p className="saving-text">Salvando avaliação...</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <main className="main">
        <div className="container">
          <div className="reservas-header">
            <div>
              <h1 className="title">Minhas Reservas</h1>
              <p className="subtitle">
                Acompanhe suas estadias no Hotel Lago do Sol
              </p>
            </div>
            <button
              className="btn-voltar-reservas"
              onClick={() => navigate("/")}
            >
              ← Voltar para Home
            </button>
          </div>

          {erro && <div className="error-message">{erro}</div>}

          {carregando ? (
            <p className="loading-text">Carregando reservas...</p>
          ) : (
            <>
              <h2 className="section-title">Reservas Ativas</h2>

              {reservasAtivas.length === 0 ? (
                <p className="empty-message">
                  Nenhuma reserva ativa encontrada.
                </p>
              ) : (
                <div className="reservas-grid">
                  {reservasAtivas.map((reserva) => (
                    <CardReserva
                      key={reserva.id}
                      reserva={reserva}
                      concluida={false}
                    />
                  ))}
                </div>
              )}

              <h2 className="section-title">Histórico de Reservas</h2>

              {reservasConcluidas.length === 0 ? (
                <p className="empty-message">
                  Nenhuma reserva concluída encontrada.
                </p>
              ) : (
                <div className="reservas-grid">
                  {reservasConcluidas.map((reserva) => (
                    <CardReserva
                      key={reserva.id}
                      reserva={reserva}
                      concluida={true}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default MinhasReservas;
