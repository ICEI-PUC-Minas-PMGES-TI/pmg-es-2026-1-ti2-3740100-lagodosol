import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import GestaoClientes from "./GestaoClientes";


function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
  });

  function formatCPF(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = formatCPF(value);
    }

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados cadastrados:", form);
  }

  return (
    <div className="cadastro-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>

        <p className="login-link">
          Já tem uma conta? <span>Entrar</span>
        </p>

        <button type="submit" className="btn-cadastrar">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/clientes" element={<GestaoClientes />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
