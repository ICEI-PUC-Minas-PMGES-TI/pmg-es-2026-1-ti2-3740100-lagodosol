import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
