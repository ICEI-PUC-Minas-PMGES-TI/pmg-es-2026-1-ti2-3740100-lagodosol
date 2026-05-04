import { useState } from "react";

function GestaoClientes() {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      cpf: "123.456.789-00",
    },
    {
      id: 2,
      nome: "Maria Souza",
      email: "maria@email.com",
      cpf: "987.654.321-00",
    },
  ]);

  const [busca, setBusca] = useState("");

  // busca mais completa
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.cpf.includes(busca),
  );

  // excluir cliente
  function excluirCliente(id) {
    setClientes(clientes.filter((c) => c.id !== id));
  }

  return (
    <div className="gestao-container">
      <h2>Gestão de Clientes</h2>

      {/* campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome, email ou CPF..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="input-busca"
      />

      {/* tabela */}
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
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>
                  <button className="btn-editar">Editar</button>

                  <button
                    className="btn-excluir"
                    onClick={() => excluirCliente(cliente.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Nenhum cliente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GestaoClientes;
