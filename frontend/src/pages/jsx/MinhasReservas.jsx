import { useEffect, useState } from "react";
import "../style/MinhasReservas.css";

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [avaliando, setAvaliando] = useState(null);

  useEffect(() => {
    async function carregarReservas() {
      try {
        const response = await fetch("http://localhost:8081/reservas");
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

      const response = await fetch(`http://localhost:8081/reservas/${id}`, {
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
        prev.map((item) => (item.id === id ? reservaAtualizada : item))
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

  const reservasAtivas = reservas.filter((reserva) => !isReservaConcluida(reserva));
  const reservasConcluidas = reservas.filter(isReservaConcluida);

  return (
    <div className="page">
      <main className="main">
        <div className="container">
          <h1 className="title">Minhas Reservas</h1>

          {erro && <div className="error-message">{erro}</div>}

          {carregando ? (
            <p className="loading-text">Carregando reservas...</p>
          ) : (
            <>
              <h2 className="section-title">Reservas Ativas</h2>

              {reservasAtivas.length === 0 ? (
                <p className="empty-message">Nenhuma reserva ativa encontrada.</p>
              ) : (
                reservasAtivas.map((reserva) => (
                  <div key={reserva.id} className="card">
                    <h3>{reserva.nomeQuarto || "Reserva"}</h3>

                    <p>
                      <strong>Check-in:</strong> {reserva.checkIn || "--"}
                    </p>

                    <p>
                      <strong>Check-out:</strong> {reserva.checkOut || "--"}
                    </p>

                    <p>
                      <strong>Tipo:</strong> {reserva.tipo || "--"}
                    </p>

                    <div className="button-container">
                      <button className="button">Ver Detalhes</button>
                    </div>
                  </div>
                ))
              )}

              <h2 className="section-title">Histórico de Reservas</h2>

              {reservasConcluidas.length === 0 ? (
                <p className="empty-message">Nenhuma reserva concluída encontrada.</p>
              ) : (
                reservasConcluidas.map((reserva) => (
                  <div key={reserva.id} className="card">
                    <h3>{reserva.nomeQuarto || "Reserva"}</h3>

                    <p>
                      <strong>Check-in:</strong> {reserva.checkIn || "--"}
                    </p>

                    <p>
                      <strong>Check-out:</strong> {reserva.checkOut || "--"}
                    </p>

                    <div className="rating-card">
                      <p>
                        <strong>Avaliação da estadia:</strong>
                      </p>

                      <div className="rating-stars">
                        {reserva.avaliacao ? (
                          <>
                            {renderStars(reserva.avaliacao)}
                            <span className="rating-value">
                              {reserva.avaliacao} de 5
                            </span>
                          </>
                        ) : (
                          <>
                            {renderStars(reserva.avaliacao || 0, (value) =>
                              avaliarReserva(reserva.id, value)
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

                    <button className="button">Ver Detalhes</button>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default MinhasReservas;
