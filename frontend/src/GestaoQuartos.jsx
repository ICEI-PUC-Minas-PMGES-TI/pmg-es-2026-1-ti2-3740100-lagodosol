import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./components/AlertMessage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./GestaoQuartos.css";

const QUARTOS_MOCK = [
  { id: 1, numero: "101", tipo: "Standard", capacidade: 2, preco: 180 },
  { id: 2, numero: "202", tipo: "Luxo", capacidade: 3, preco: 320 },
  { id: 3, numero: "302", tipo: "Suíte", capacidade: 4, preco: 520 },
];

export default function GestaoQuartos() {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState(QUARTOS_MOCK);
  const [alerta, setAlerta] = useState(null);

  const totalQuartos = quartos.length;
  const capacidadeTotal = useMemo(
    () => quartos.reduce((total, quarto) => total + Number(quarto.capacidade || 0), 0),
    [quartos],
  );
  const diariaMedia = useMemo(() => {
    if (quartos.length === 0) return 0;
    const total = quartos.reduce((soma, quarto) => soma + Number(quarto.preco || 0), 0);
    return total / quartos.length;
  }, [quartos]);

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este quarto?")) return;

    const quarto = quartos.find((item) => item.id === id);
    setQuartos((prev) => prev.filter((item) => item.id !== id));
    setAlerta({
      type: "success",
      title: "Quarto removido",
      message: `O quarto ${quarto?.numero || ""} saiu da lista desta sessão.`,
    });
  }

  return (
    <div className="gestao-wrapper">
      <Header />

      <main className="gestao-container">
        <div className="gestao-inner">
          <div className="gestao-topbar">
            <div>
              <span className="gestao-eyebrow">Administração</span>
              <h2>Gestão de Quartos</h2>
            </div>

            <button className="btn-novo" onClick={() => navigate("/cadastro-quarto")}>
              Novo Quarto
            </button>
          </div>

          <div className="gestao-resumo">
            <div className="gestao-resumo-item">
              <span>Quartos</span>
              <strong>{totalQuartos}</strong>
            </div>
            <div className="gestao-resumo-item">
              <span>Capacidade total</span>
              <strong>{capacidadeTotal}</strong>
            </div>
            <div className="gestao-resumo-item">
              <span>Diária média</span>
              <strong>{formatarMoeda(diariaMedia)}</strong>
            </div>
          </div>

          <AlertMessage
            type={alerta?.type}
            title={alerta?.title}
            message={alerta?.message}
            onClose={() => setAlerta(null)}
          />

          {quartos.length === 0 ? (
            <div className="gestao-vazio">
              <strong>Nenhum quarto cadastrado</strong>
              <p>Use o botão Novo Quarto para iniciar o cadastro.</p>
            </div>
          ) : (
            <div className="gestao-lista">
              <div className="gestao-lista-cabecalho">
                <span>Quarto</span>
                <span>Capacidade</span>
                <span>Diária</span>
                <span>Ações</span>
              </div>

              {quartos.map((quarto) => (
                <div key={quarto.id} className="gestao-quarto-card">
                  <div className="gestao-quarto-principal">
                    <span className="gestao-quarto-numero">{quarto.numero}</span>
                    <div>
                      <strong>{quarto.tipo}</strong>
                      <p>Quarto {quarto.numero}</p>
                    </div>
                  </div>

                  <span>{quarto.capacidade} pessoa(s)</span>
                  <strong>{formatarMoeda(quarto.preco)}</strong>

                  <div className="gestao-acoes">
                    <button
                      className="btn-editar"
                      onClick={() => navigate(`/cadastro-quarto?id=${quarto.id}`)}
                    >
                      Editar
                    </button>
                    <button className="btn-excluir" onClick={() => excluir(quarto.id)}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
