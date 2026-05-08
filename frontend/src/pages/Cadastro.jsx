import "../App.css";

import { useState } from "react";

import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
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

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    fetch("http://localhost:8080/usuarios", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nome: form.nome,
        cpf: form.cpf,
        email: form.email,
        senha: form.senha,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar usuário");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Usuário cadastrado:", data);

        alert("Cadastro realizado com sucesso!");

        setForm({
          nome: "",
          cpf: "",
          email: "",
          senha: "",
          confirmarSenha: "",
        });
      })
      .catch((error) => {
        console.error(error);

        alert("Erro ao cadastrar usuário");
      });
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="cadastro-container">
          <img
            src={logo}
            alt="Logo do Hotel Lago do Sol"
            className="logo-cadastro"
          />

          <div className="cadastro-box">
            <h2>CRIAR NOVA CONTA</h2>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label>Nome completo</label>

                <input
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome completo..."
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>CPF</label>

                <input
                  type="text"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>E-mail</label>

                <input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Senha</label>

                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmar senha</label>

                <input
                  type="password"
                  name="confirmarSenha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-cadastrar">
                Cadastrar Conta
              </button>

              <p className="login-link">
                Já tem uma conta? <Link to="/login">Entrar</Link>
              </p>
            </form>

            <div className="termos">
              <p>
                Ao se cadastrar, você concorda com nossos termos de uso e
                política de privacidade.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CadastroUsuario;
