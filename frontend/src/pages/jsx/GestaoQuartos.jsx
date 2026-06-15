import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import Footer from "./Footer";
import Header from "./Header";
import "../style/GestaoQuartos.css";

const API = "http://localhost:8081";

export default function GestaoQuartos() {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState([]);
  const [alerta, setAlerta] = useState(null);

  async function buscarQuartos() {
    try {
      const response = await fetch(`${API}/quartos`);
      const data = await response.json();
      setQuartos(data);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
      setAlerta({ type: "error", title: "Erro", message: "Não foi possível carregar os quartos." });
    }
  }

  useEffect(() => {
    buscarQuartos();
  }, []);

  const totalQuartos = quartos.length;
  const capacidadeTotal = useMemo(
    () => quartos.reduce((total, q) => total + Number(q.capacidade || 0), 0),
    [quartos]
  );
  const diariaMedia = useMemo(() => {
    if (quartos.length === 0) return 0;
    return quartos.reduce((soma, q) => soma + Number(q.preco || 0), 0) / quartos.length;
  }, [quartos]);

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  async function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este quarto?")) return;

    try {
      const response = await fetch(`${API}/quartos/${id}`, { method: "DELETE" });

      if (!response.ok) {
        setAlerta({ type: "error", title: "Erro", message: "Não foi possível excluir o quarto." });
        return;
      }

      setAlerta({ type: "success", title: "Quarto removido", message: "O quarto foi excluído com sucesso." });
      buscarQuartos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setAlerta({ type: "error", title: "Erro", message: "Não foi possível conectar com o servidor." });
    }
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
