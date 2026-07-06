import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import Footer from "./Footer";
import Header from "./Header";
import "../style/GestaoQuartos.css";

const API = "https://pmg-es-2026-1-ti2-3740100-lagodosol.onrender.com";

export default function GestaoQuartos() {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");

  async function buscarQuartos() {
    setCarregando(true);

    try {
      const response = await fetch(`${API}/quartos`);
      if (!response.ok) {
        throw new Error("Falha ao carregar quartos.");
      }

      const data = await response.json();
      setQuartos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
      setAlerta({
        type: "error",
        title: "Erro",
        message: "Não foi possível carregar os quartos.",
      });
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarQuartos();
  }, []);

  const totalQuartos = quartos.length;
  const capacidadeTotal = useMemo(
    () => quartos.reduce((total, q) => total + Number(q.capacidade || 0), 0),
    [quartos],
  );
  const diariaMedia = useMemo(() => {
    if (quartos.length === 0) return 0;
    return (
      quartos.reduce((soma, q) => soma + Number(q.preco || 0), 0) /
      quartos.length
    );
  }, [quartos]);
  const tipos = useMemo(
    () => [...new Set(quartos.map((q) => q.tipo).filter(Boolean))].sort(),
    [quartos],
  );
  const quartosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return quartos.filter((quarto) => {
      const bateTipo = !tipoFiltro || quarto.tipo === tipoFiltro;
      const bateBusca =
        !termo ||
        String(quarto.numero || "")
          .toLowerCase()
          .includes(termo) ||
        String(quarto.tipo || "")
          .toLowerCase()
          .includes(termo);

      return bateTipo && bateBusca;
    });
  }, [quartos, busca, tipoFiltro]);

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este quarto?")) return;

    try {
      const response = await fetch(`${API}/quartos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setAlerta({
          type: "error",
          title: "Erro",
          message: "Não foi possível excluir o quarto.",
        });
        return;
      }

      setAlerta({
        type: "success",
        title: "Quarto removido",
        message: "O quarto foi excluído com sucesso.",
      });
      buscarQuartos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setAlerta({
        type: "error",
        title: "Erro",
        message: "Não foi possível conectar com o servidor.",
      });
    }
  }

  return (
    <div className="gestao-wrapper">
      <main className="gestao-container">
        <div className="gestao-inner">
          <div className="gestao-topbar">
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "8px 16px",
                background: "#0d5c63",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                height: "fit-content",
              }}
            >
              ← Voltar para Home
            </button>

            <div>
              <span className="gestao-eyebrow">Administração</span>
              <h2>Gestão de Quartos</h2>
            </div>
            <button
              className="btn-novo"
              onClick={() => navigate("/cadastro-quarto")}
            >
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

          <div className="gestao-filtros">
            <label>
              <span>Buscar</span>
              <input
                type="search"
                placeholder="Número ou tipo do quarto"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </label>

            <label>
              <span>Tipo</span>
              <select
                value={tipoFiltro}
                onChange={(event) => setTipoFiltro(event.target.value)}
              >
                <option value="">Todos</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <AlertMessage
            type={alerta?.type}
            title={alerta?.title}
            message={alerta?.message}
            onClose={() => setAlerta(null)}
          />

          {carregando ? (
            <div className="gestao-vazio">
              <strong>Carregando quartos...</strong>
              <p>Aguarde enquanto os dados são buscados no servidor.</p>
            </div>
          ) : quartos.length === 0 ? (
            <div className="gestao-vazio">
              <strong>Nenhum quarto cadastrado</strong>
              <p>Use o botão Novo Quarto para iniciar o cadastro.</p>
            </div>
          ) : quartosFiltrados.length === 0 ? (
            <div className="gestao-vazio">
              <strong>Nenhum quarto encontrado</strong>
              <p>Ajuste a busca ou o filtro selecionado.</p>
            </div>
          ) : (
            <div className="gestao-lista">
              <div className="gestao-lista-cabecalho">
                <span>Quarto</span>
                <span>Capacidade</span>
                <span>Diária</span>
                <span>Ações</span>
              </div>

              {quartosFiltrados.map((quarto) => (
                <div key={quarto.id} className="gestao-quarto-card">
                  <div className="gestao-quarto-principal">
                    {quarto.imagemBase64 ? (
                      <img
                        className="gestao-quarto-imagem"
                        src={quarto.imagemBase64}
                        alt={`Quarto ${quarto.numero}`}
                      />
                    ) : (
                      <span className="gestao-quarto-numero">
                        {quarto.numero}
                      </span>
                    )}
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
                      onClick={() =>
                        navigate(`/cadastro-quarto?id=${quarto.id}`)
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => excluir(quarto.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
