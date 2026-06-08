import "./MinhasReservas.css";

function App() {
  const reservasAtivas = [
    {
      id: 1,
      quarto: "Suíte Master",
      checkIn: "15/08/2026",
      checkOut: "18/08/2026",
      status: "Confirmada",
    },
    {
      id: 2,
      quarto: "Quarto Luxo",
      checkIn: "20/08/2026",
      checkOut: "25/08/2026",
      status: "Confirmada",
    },
  ];

  const reservasConcluidas = [
    {
      id: 3,
      quarto: "Quarto Standard",
      checkIn: "10/05/2026",
      checkOut: "12/05/2026",
      status: "Concluída",
    },
  ];

  return (
    <div className="page">
      <main className="main">
        <div className="container">
          <h1 className="title">Minhas Reservas</h1>

          <h2 className="section-title">Reservas Ativas</h2>

          {reservasAtivas.map((reserva) => (
            <div key={reserva.id} className="card">
              <h3>{reserva.quarto}</h3>

              <p>
                <strong>Check-in:</strong> {reserva.checkIn}
              </p>

              <p>
                <strong>Check-out:</strong> {reserva.checkOut}
              </p>

              <p>
                <strong>Status:</strong> {reserva.status}
              </p>

              <div className="button-container">
                <button className="button">Ver Detalhes</button>

                <button className="cancel-button">Cancelar Reserva</button>
              </div>
            </div>
          ))}

          <h2 className="section-title">Histórico de Reservas</h2>

          {reservasConcluidas.map((reserva) => (
            <div key={reserva.id} className="card">
              <h3>{reserva.quarto}</h3>

              <p>
                <strong>Check-in:</strong> {reserva.checkIn}
              </p>

              <p>
                <strong>Check-out:</strong> {reserva.checkOut}
              </p>

              <p>
                <strong>Status:</strong> {reserva.status}
              </p>

              <button className="button">Ver Detalhes</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
