import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/GestaoClientes.css";

const API = "http://localhost:8081";

function GestaoClientes() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({ nome: "", email: "" });

  async function carregarClientes() {
    setCarregando(true);
    setErro(null);
    try {
      const response = await fetch(`${API}/usuarios`);
      if (!response.ok) throw new Error("Falha ao carregar clientes.");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os clientes. Verifique se o backend está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.cpf?.includes(busca)
  );

  async function excluirCliente(id) {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return;

    try {
      const response = await fetch(`${API}/usuarios/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir cliente.");

      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir o cliente.");
    }
  }

  function iniciarEdicao(cliente) {
    setEditandoId(cliente.id);
    setFormEdicao({ nome: cliente.nome || "", email: cliente.email || "" });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setFormEdicao({ nome: "", email: "" });
  }

  async function salvarEdicao(id) {
    try {
      const response = await fetch(`${API}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdicao),
      });

      if (!response.ok) throw new Error("Erro ao atualizar cliente.");

      const clienteAtualizado = await response.json();
      setClientes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...clienteAtualizado } : c))
      );
      cancelarEdicao();
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar as alterações.");
    }
  }

  return (
    <div className="gestao-container">
      <div className="card-clientes">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0 }}>Gestão de Clientes</h2>
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
            }}
          >
            ← Voltar para Home
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar por nome, email ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input-busca"
        />

        {erro && (
          <p style={{ color: "#c0392b", margin: "12px 0" }}>{erro}</p>
        )}

        {carregando ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            Carregando clientes...
          </p>
        ) : (
          <table className="tabela-clientes">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    {editandoId === cliente.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={formEdicao.nome}
                            onChange={(e) => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                            style={{ width: "100%", padding: "6px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            value={formEdicao.email}
                            onChange={(e) => setFormEdicao({ ...formEdicao, email: e.target.value })}
                            style={{ width: "100%", padding: "6px" }}
                          />
                        </td>
                        <td>{cliente.cpf}</td>
                        <td className="acoes">
                          <button className="btn-editar" onClick={() => salvarEdicao(cliente.id)}>
                            Salvar
                          </button>
                          <button className="btn-excluir" onClick={cancelarEdicao}>
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{cliente.nome}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.cpf}</td>
                        <td className="acoes">
                          <button className="btn-editar" onClick={() => iniciarEdicao(cliente)}>
                            Editar
                          </button>
                          <button
                            className="btn-excluir"
                            onClick={() => excluirCliente(cliente.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="sem-dados">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GestaoClientes;
