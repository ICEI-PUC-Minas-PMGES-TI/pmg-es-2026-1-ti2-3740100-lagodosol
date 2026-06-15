import "../style/App.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import AlertMessage from "./AlertMessage";

function CadastroUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [alerta, setAlerta] = useState(null);

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

    setForm({ ...form, [name]: value });
    setAlerta(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlerta(null);

    if (form.senha !== form.confirmarSenha) {
      setAlerta({
        type: "error",
        title: "Senhas diferentes",
        message: "Digite a mesma senha nos dois campos.",
      });
      return;
    }

    fetch("http://localhost:8081/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        cpf: form.cpf,
        dataNascimento: form.dataNascimento,
        email: form.email,
        senha: form.senha,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao cadastrar usuário");
        return response.json();
      })
      .then(() => {
        // Redireciona para o login com mensagem de sucesso via state
        navigate("/login", {
          state: {
            mensagem:
              "Cadastro realizado com sucesso! Faça login para continuar.",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setAlerta({
          type: "error",
          title: "Erro ao cadastrar",
          message: "Não foi possível criar a conta. Tente novamente.",
        });
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

            <AlertMessage
              type={alerta?.type}
              title={alerta?.title}
              message={alerta?.message}
              onClose={() => setAlerta(null)}
            />

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
                <label>Data de nascimento</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={form.dataNascimento}
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
