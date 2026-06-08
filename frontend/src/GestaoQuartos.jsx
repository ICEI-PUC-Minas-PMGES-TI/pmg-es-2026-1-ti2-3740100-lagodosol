import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestaoQuartos.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const QUARTOS_MOCK = [
  { id: 1, numero: "101", tipo: "Standard", capacidade: 2, preco: 180 },
  { id: 2, numero: "202", tipo: "Luxo",     capacidade: 3, preco: 320 },
  { id: 3, numero: "302", tipo: "Suíte",    capacidade: 4, preco: 520 },
];

export default function GestaoQuartos() {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState(QUARTOS_MOCK);

  function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este quarto?")) return;
    setQuartos((prev) => prev.filter((q) => q.id !== id));
  }

  return (
    <div className="gestao-wrapper">
      <Header />

      <main className="gestao-container">
        <div className="gestao-inner">

          <div className="gestao-topbar">
            <h2>GESTÃO DE QUARTOS</h2>
            {/* Corrigido: agora aponta para /cadastro-quarto */}
            <button className="btn-novo" onClick={() => navigate("/cadastro-quarto")}>
              + Novo Quarto
            </button>
          </div>

          {quartos.length === 0 ? (
            <div className="gestao-vazio">Nenhum quarto cadastrado.</div>
          ) : (
            <div className="gestao-tabela">
              <div className="gestao-linha gestao-cabecalho">
                <span>Número</span>
                <span>Tipo</span>
                <span>Capacidade</span>
                <span>Diária</span>
                <span>Ações</span>
              </div>

              {quartos.map((q) => (
                <div key={q.id} className="gestao-linha">
                  <span>{q.numero}</span>
                  <span>{q.tipo}</span>
                  <span>{q.capacidade} pessoa(s)</span>
                  <span>R$ {q.preco}</span>
                  <div className="gestao-acoes">
                    <button
                      className="btn-editar"
                      onClick={() => navigate(`/cadastro-quarto?id=${q.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => excluir(q.id)}
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

      <Footer />
    </div>
  );
}
