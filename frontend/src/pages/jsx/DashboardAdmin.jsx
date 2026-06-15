import Header from "./Header";
import "../style/DashboardAdmin.css";

const indicadores = [
  {
    id: "ocupacao",
    nome: "Taxa de ocupação",
    valor: 78,
    unidade: "%",
    meta: 75,
    descricao: "Quartos ocupados no período analisado",
    fonte: "QUARTO, RESERVA",
    cor: "#176b67",
    historico: [58, 64, 69, 73, 76, 78],
  },
  {
    id: "cancelamento",
    nome: "Cancelamento de reservas",
    valor: 9,
    unidade: "%",
    meta: 12,
    descricao: "Reservas canceladas em relação ao total",
    fonte: "RESERVA",
    cor: "#dc2626",
    historico: [14, 12, 10, 11, 8, 9],
  },
  {
    id: "media-clientes",
    nome: "Média de reservas por cliente",
    valor: 1.8,
    unidade: "",
    meta: 1.5,
    descricao: "Reservas realizadas por cliente",
    fonte: "CLIENTE, RESERVA",
    cor: "#2563eb",
    historico: [1.1, 1.2, 1.4, 1.5, 1.7, 1.8],
  },
  {
    id: "recorrencia",
    nome: "Recorrência de reservas",
    valor: 2.4,
    unidade: "",
    meta: 2,
    descricao: "Reservas médias por cliente no período",
    fonte: "CLIENTE, RESERVA",
    cor: "#7c3aed",
    historico: [1.5, 1.6, 1.8, 2.1, 2.2, 2.4],
  },
  {
    id: "satisfacao",
    nome: "Índice de satisfação",
    valor: 4.6,
    unidade: "/5",
    meta: 4.2,
    descricao: "Média das avaliações registradas",
    fonte: "CLIENTE, RESERVA",
    cor: "#f59e0b",
    historico: [3.9, 4.1, 4.2, 4.3, 4.5, 4.6],
  },
];

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

const ocupacaoPorTipo = [
  { tipo: "Standard", valor: 72 },
  { tipo: "Luxo", valor: 81 },
  { tipo: "Suíte", valor: 66 },
];

function formatarValor(indicador) {
  return `${String(indicador.valor).replace(".", ",")}${indicador.unidade}`;
}

function LinhaGrafico({ dados, cor }) {
  const max = Math.max(...dados);
  const min = Math.min(...dados);
  const faixa = max - min || 1;
  const pontos = dados
    .map((valor, index) => {
      const x = (index / (dados.length - 1)) * 100;
      const y = 72 - ((valor - min) / faixa) * 56;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="dashboard-linha-svg" viewBox="0 0 100 80" preserveAspectRatio="none">
      <polyline points={pontos} fill="none" stroke={cor} strokeWidth="4" strokeLinecap="round" />
      {dados.map((valor, index) => {
        const x = (index / (dados.length - 1)) * 100;
        const y = 72 - ((valor - min) / faixa) * 56;
        return <circle key={index} cx={x} cy={y} r="2.4" fill={cor} />;
      })}
    </svg>
  );
}

function Gauge({ valor, cor }) {
  const percentual = Math.min(Math.max(valor, 0), 100);

  return (
    <div className="dashboard-gauge" style={{ "--valor": `${percentual}%`, "--cor": cor }}>
      <div className="dashboard-gauge-centro">
        <strong>{percentual}%</strong>
        <span>ocupação</span>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const ocupacao = indicadores[0];
  const cancelamento = indicadores[1];
  const satisfacao = indicadores[4];

  return (
    <div className="dashboard-admin-wrapper">
      <Header />

      <main className="dashboard-admin-container">
        <section className="dashboard-hero">
          <div>
            <span className="dashboard-eyebrow">Painel administrativo</span>
            <h1>Dashboard de Desempenho</h1>
            <p>
              Acompanhe os indicadores definidos para ocupação, cancelamentos,
              comportamento dos clientes, recorrência e satisfação.
            </p>
          </div>

          <div className="dashboard-periodo">
            <span>Período analisado</span>
            <strong>Janeiro a Junho</strong>
          </div>
        </section>

        <section className="dashboard-kpis">
          {indicadores.map((indicador) => (
            <article key={indicador.id} className="dashboard-kpi-card">
              <span className="dashboard-kpi-fonte">{indicador.fonte}</span>
              <h2>{formatarValor(indicador)}</h2>
              <strong>{indicador.nome}</strong>
              <p>{indicador.descricao}</p>
              <div className="dashboard-meta">
                <span>Meta</span>
                <b>
                  {String(indicador.meta).replace(".", ",")}
                  {indicador.unidade}
                </b>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card dashboard-card-large">
            <div className="dashboard-card-header">
              <div>
                <span>Tendência mensal</span>
                <h2>Indicadores por período</h2>
              </div>
            </div>

            <div className="dashboard-series">
              {indicadores.map((indicador) => (
                <div key={indicador.id} className="dashboard-serie">
                  <div className="dashboard-serie-topo">
                    <span>{indicador.nome}</span>
                    <strong>{formatarValor(indicador)}</strong>
                  </div>
                  <LinhaGrafico dados={indicador.historico} cor={indicador.cor} />
                  <div className="dashboard-meses">
                    {meses.map((mes) => (
                      <span key={mes}>{mes}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <span>Utilização dos quartos</span>
                <h2>Taxa de ocupação</h2>
              </div>
            </div>
            <Gauge valor={ocupacao.valor} cor={ocupacao.cor} />
            <p className="dashboard-card-texto">
              Meta de {ocupacao.meta}% para avaliar o nível de utilização dos quartos.
            </p>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <span>Reservas</span>
                <h2>Cancelamentos</h2>
              </div>
            </div>
            <div className="dashboard-barra-comparacao">
              <div>
                <span>Atual</span>
                <strong>{cancelamento.valor}%</strong>
                <i style={{ width: `${cancelamento.valor * 5}%` }} />
              </div>
              <div>
                <span>Limite</span>
                <strong>{cancelamento.meta}%</strong>
                <i style={{ width: `${cancelamento.meta * 5}%` }} />
              </div>
            </div>
          </article>

          <article className="dashboard-card dashboard-card-wide">
            <div className="dashboard-card-header">
              <div>
                <span>Quartos por categoria</span>
                <h2>Ocupação por tipo</h2>
              </div>
            </div>
            <div className="dashboard-barras">
              {ocupacaoPorTipo.map((item) => (
                <div key={item.tipo} className="dashboard-barra">
                  <span>{item.tipo}</span>
                  <div>
                    <i style={{ width: `${item.valor}%` }} />
                  </div>
                  <strong>{item.valor}%</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <span>Experiência do cliente</span>
                <h2>Satisfação</h2>
              </div>
            </div>
            <div className="dashboard-satisfacao">
              <strong>{satisfacao.valor.toString().replace(".", ",")}</strong>
              <span>de 5 pontos</span>
            </div>
            <div className="dashboard-estrelas" aria-label="Avaliação média">
              <span className="ativo" />
              <span className="ativo" />
              <span className="ativo" />
              <span className="ativo" />
              <span className="meio" />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
