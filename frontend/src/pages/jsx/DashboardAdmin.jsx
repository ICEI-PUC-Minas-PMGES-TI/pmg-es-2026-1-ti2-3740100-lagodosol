import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import "../style/DashboardAdmin.css";

const API = "http://localhost:8081";

const CORES = {
  ocupacao: "#176b67",
  cancelamento: "#dc2626",
  mediaClientes: "#2563eb",
  recorrencia: "#7c3aed",
  satisfacao: "#f59e0b",
};

const METAS = {
  ocupacao: 75,
  cancelamento: 12,
  mediaClientes: 1.5,
  recorrencia: 2,
  satisfacao: 4.2,
};

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function dataSegura(valor) {
  if (!valor) return null;
  const data = new Date(`${valor}T12:00:00`);
  return Number.isNaN(data.getTime()) ? null : data;
}

function reservaEstaNoMes(reserva, ano, mes) {
  const inicio = dataSegura(reserva.checkIn);
  const fim = dataSegura(reserva.checkOut) || inicio;

  if (!inicio) return false;

  const inicioMes = new Date(ano, mes, 1);
  const fimMes = new Date(ano, mes + 1, 0, 23, 59, 59);

  return inicio <= fimMes && fim >= inicioMes;
}

function reservaCancelada(reserva) {
  const status = String(reserva.status || reserva.situacao || reserva.estado || "").toLowerCase();
  return ["cancelada", "cancelado", "cancelled"].includes(status);
}

function arredondar(valor, casas = 1) {
  return Number(valor.toFixed(casas));
}

function formatarNumero(valor) {
  return String(valor).replace(".", ",");
}

function formatarValor(indicador) {
  if (indicador.semDados) return "--";
  return `${formatarNumero(indicador.valor)}${indicador.unidade}`;
}

function calcularHistorico({ quartos, reservas, clientes, anoAtual }) {
  return MESES.map((mes, indice) => {
    const reservasDoMes = reservas.filter((reserva) => reservaEstaNoMes(reserva, anoAtual, indice));
    const reservasValidas = reservasDoMes.filter((reserva) => !reservaCancelada(reserva));
    const quartosOcupados = new Set(reservasValidas.map((reserva) => reserva.quartoId).filter(Boolean)).size;
    const avaliacoes = reservasDoMes
      .map((reserva) => Number(reserva.avaliacao))
      .filter((avaliacao) => Number.isFinite(avaliacao) && avaliacao > 0);
    const canceladas = reservasDoMes.filter(reservaCancelada).length;

    return {
      mes,
      ocupacao: quartos.length ? arredondar((quartosOcupados / quartos.length) * 100) : 0,
      cancelamento: reservasDoMes.length ? arredondar((canceladas / reservasDoMes.length) * 100) : 0,
      mediaClientes: clientes.length ? arredondar(reservasDoMes.length / clientes.length) : 0,
      recorrencia: clientes.length ? arredondar(reservasValidas.length / clientes.length) : 0,
      satisfacao: avaliacoes.length
        ? arredondar(avaliacoes.reduce((soma, nota) => soma + nota, 0) / avaliacoes.length)
        : 0,
    };
  });
}

function LinhaGrafico({ dados, cor }) {
  const valores = dados.length ? dados : [0];
  const max = Math.max(...valores, 1);
  const min = Math.min(...valores, 0);
  const faixa = max - min || 1;
  const divisor = Math.max(valores.length - 1, 1);
  const pontos = valores
    .map((valor, index) => {
      const x = (index / divisor) * 100;
      const y = 72 - ((valor - min) / faixa) * 56;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="dashboard-linha-svg" viewBox="0 0 100 80" preserveAspectRatio="none">
      <polyline points={pontos} fill="none" stroke={cor} strokeWidth="4" strokeLinecap="round" />
      {valores.map((valor, index) => {
        const x = (index / divisor) * 100;
        const y = 72 - ((valor - min) / faixa) * 56;
        return <circle key={index} cx={x} cy={y} r="2.4" fill={cor} />;
      })}
    </svg>
  );
}

function Gauge({ valor, cor }) {
  const percentual = Math.min(Math.max(Number(valor) || 0, 0), 100);

  return (
    <div className="dashboard-gauge" style={{ "--valor": `${percentual}%`, "--cor": cor }}>
      <div className="dashboard-gauge-centro">
        <strong>{formatarNumero(percentual)}%</strong>
        <span>ocupação</span>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const [quartos, setQuartos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro("");

      try {
        const [resQuartos, resReservas, resClientes] = await Promise.all([
          fetch(`${API}/quartos`),
          fetch(`${API}/reservas`),
          fetch(`${API}/usuarios`),
        ]);

        if (!resQuartos.ok || !resReservas.ok || !resClientes.ok) {
          throw new Error("Não foi possível carregar todos os dados do dashboard.");
        }

        const [dadosQuartos, dadosReservas, dadosClientes] = await Promise.all([
          resQuartos.json(),
          resReservas.json(),
          resClientes.json(),
        ]);

        setQuartos(Array.isArray(dadosQuartos) ? dadosQuartos : []);
        setReservas(Array.isArray(dadosReservas) ? dadosReservas : []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        setErro("Não foi possível carregar os dados reais. Verifique se o backend está rodando.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const dados = useMemo(() => {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const historicoCompleto = calcularHistorico({ quartos, reservas, clientes, anoAtual });
    const historicoVisivel = historicoCompleto.slice(0, mesAtual + 1);
    const reservasDoMes = reservas.filter((reserva) => reservaEstaNoMes(reserva, anoAtual, mesAtual));
    const reservasValidasDoMes = reservasDoMes.filter((reserva) => !reservaCancelada(reserva));
    const quartosOcupadosDoMes = new Set(
      reservasValidasDoMes.map((reserva) => reserva.quartoId).filter(Boolean),
    ).size;
    const reservasCanceladasDoMes = reservasDoMes.filter(reservaCancelada).length;
    const avaliacoes = reservas
      .map((reserva) => Number(reserva.avaliacao))
      .filter((avaliacao) => Number.isFinite(avaliacao) && avaliacao > 0);

    const taxaOcupacao = quartos.length ? arredondar((quartosOcupadosDoMes / quartos.length) * 100) : 0;
    const taxaCancelamento = reservasDoMes.length
      ? arredondar((reservasCanceladasDoMes / reservasDoMes.length) * 100)
      : 0;
    const mediaReservasPorCliente = clientes.length ? arredondar(reservas.length / clientes.length) : 0;
    const recorrencia = clientes.length ? arredondar(reservasValidasDoMes.length / clientes.length) : 0;
    const satisfacao = avaliacoes.length
      ? arredondar(avaliacoes.reduce((soma, nota) => soma + nota, 0) / avaliacoes.length)
      : 0;

    const cancelamentoTemStatus = reservas.some(
      (reserva) => reserva.status || reserva.situacao || reserva.estado,
    );

    const indicadores = [
      {
        id: "ocupacao",
        nome: "Taxa de ocupação",
        valor: taxaOcupacao,
        unidade: "%",
        meta: METAS.ocupacao,
        descricao: "Quartos ocupados no mês atual",
        fonte: "QUARTO, RESERVA",
        cor: CORES.ocupacao,
        historico: historicoVisivel.map((item) => item.ocupacao),
      },
      {
        id: "cancelamento",
        nome: "Cancelamento de reservas",
        valor: taxaCancelamento,
        unidade: "%",
        meta: METAS.cancelamento,
        descricao: cancelamentoTemStatus
          ? "Reservas canceladas em relação ao total"
          : "O banco ainda não possui status de cancelamento",
        fonte: "RESERVA",
        cor: CORES.cancelamento,
        historico: historicoVisivel.map((item) => item.cancelamento),
        semDados: !cancelamentoTemStatus && reservas.length > 0,
      },
      {
        id: "media-clientes",
        nome: "Média de reservas por cliente",
        valor: mediaReservasPorCliente,
        unidade: "",
        meta: METAS.mediaClientes,
        descricao: "Reservas cadastradas divididas pelo total de clientes",
        fonte: "CLIENTE, RESERVA",
        cor: CORES.mediaClientes,
        historico: historicoVisivel.map((item) => item.mediaClientes),
      },
      {
        id: "recorrencia",
        nome: "Recorrência de reservas",
        valor: recorrencia,
        unidade: "",
        meta: METAS.recorrencia,
        descricao: "Reservas ativas no mês divididas pelo total de clientes",
        fonte: "CLIENTE, RESERVA",
        cor: CORES.recorrencia,
        historico: historicoVisivel.map((item) => item.recorrencia),
      },
      {
        id: "satisfacao",
        nome: "Índice de satisfação",
        valor: satisfacao,
        unidade: "/5",
        meta: METAS.satisfacao,
        descricao: "Média das avaliações registradas pelos clientes",
        fonte: "CLIENTE, RESERVA",
        cor: CORES.satisfacao,
        historico: historicoVisivel.map((item) => item.satisfacao),
        semDados: avaliacoes.length === 0,
      },
    ];

    const ocupacaoPorTipo = quartos.map((quarto) => {
      const reservasDoQuarto = reservasValidasDoMes.filter((reserva) => reserva.quartoId === quarto.id);
      return {
        tipo: `${quarto.numero} - ${quarto.tipo || "Quarto"}`,
        valor: reservasDoQuarto.length > 0 ? 100 : 0,
      };
    });

    return {
      indicadores,
      meses: historicoVisivel.map((item) => item.mes),
      ocupacaoPorTipo,
      resumo: {
        quartos: quartos.length,
        reservas: reservas.length,
        clientes: clientes.length,
        avaliacoes: avaliacoes.length,
        mesAtual: MESES[mesAtual],
        anoAtual,
      },
    };
  }, [quartos, reservas, clientes]);

  const ocupacao = dados.indicadores[0];
  const cancelamento = dados.indicadores[1];
  const satisfacao = dados.indicadores[4];

  return (
    <div className="dashboard-admin-wrapper">
      <Header />

      <main className="dashboard-admin-container">
        <section className="dashboard-hero">
          <div>
            <span className="dashboard-eyebrow">Painel administrativo</span>
            <h1>Dashboard de Desempenho</h1>
            <p>
              Indicadores calculados a partir dos quartos, reservas, clientes e avaliações cadastrados no sistema.
            </p>
          </div>

          <div className="dashboard-periodo">
            <span>Período analisado</span>
            <strong>{dados.resumo.mesAtual} de {dados.resumo.anoAtual}</strong>
          </div>
        </section>

        {erro && <div className="dashboard-alerta">{erro}</div>}

        {carregando ? (
          <div className="dashboard-estado">Carregando dados reais do dashboard...</div>
        ) : (
          <>
            <section className="dashboard-resumo">
              <div>
                <span>Quartos</span>
                <strong>{dados.resumo.quartos}</strong>
              </div>
              <div>
                <span>Reservas</span>
                <strong>{dados.resumo.reservas}</strong>
              </div>
              <div>
                <span>Clientes</span>
                <strong>{dados.resumo.clientes}</strong>
              </div>
              <div>
                <span>Avaliações</span>
                <strong>{dados.resumo.avaliacoes}</strong>
              </div>
            </section>

            <section className="dashboard-kpis">
              {dados.indicadores.map((indicador) => (
                <article key={indicador.id} className="dashboard-kpi-card">
                  <span className="dashboard-kpi-fonte">{indicador.fonte}</span>
                  <h2>{formatarValor(indicador)}</h2>
                  <strong>{indicador.nome}</strong>
                  <p>{indicador.descricao}</p>
                  <div className="dashboard-meta">
                    <span>Meta</span>
                    <b>
                      {formatarNumero(indicador.meta)}
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
                  {dados.indicadores.map((indicador) => (
                    <div key={indicador.id} className="dashboard-serie">
                      <div className="dashboard-serie-topo">
                        <span>{indicador.nome}</span>
                        <strong>{formatarValor(indicador)}</strong>
                      </div>
                      <LinhaGrafico dados={indicador.historico} cor={indicador.cor} />
                      <div className="dashboard-meses">
                        {dados.meses.map((mes) => (
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
                  {ocupacao.valor}% dos quartos possuem reserva ativa no mês analisado.
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
                    <strong>{formatarValor(cancelamento)}</strong>
                    <i style={{ width: `${Math.min(cancelamento.valor * 5, 100)}%` }} />
                  </div>
                  <div>
                    <span>Limite</span>
                    <strong>{cancelamento.meta}%</strong>
                    <i style={{ width: `${Math.min(cancelamento.meta * 5, 100)}%` }} />
                  </div>
                </div>
              </article>

              <article className="dashboard-card dashboard-card-wide">
                <div className="dashboard-card-header">
                  <div>
                    <span>Quartos no mês</span>
                    <h2>Ocupação por quarto</h2>
                  </div>
                </div>
                <div className="dashboard-barras">
                  {dados.ocupacaoPorTipo.length === 0 ? (
                    <p className="dashboard-card-texto">Nenhum quarto cadastrado.</p>
                  ) : (
                    dados.ocupacaoPorTipo.map((item) => (
                      <div key={item.tipo} className="dashboard-barra">
                        <span>{item.tipo}</span>
                        <div>
                          <i style={{ width: `${item.valor}%` }} />
                        </div>
                        <strong>{item.valor}%</strong>
                      </div>
                    ))
                  )}
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
                  <strong>{satisfacao.semDados ? "--" : formatarNumero(satisfacao.valor)}</strong>
                  <span>de 5 pontos</span>
                </div>
                <div className="dashboard-estrelas" aria-label="Avaliação média">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <span key={estrela} className={satisfacao.valor >= estrela ? "ativo" : ""} />
                  ))}
                </div>
              </article>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
