import "../style/App.css";

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import AlertMessage from "./AlertMessage";

const ADMIN = {
  email: "admin@gmail.com",
  senha: "admin123",
  nome: "Admin",
  role: "admin",
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", senha: "" });
  const [alerta, setAlerta] = useState(() =>
    location.state?.mensagem
      ? {
          type: "success",
          title: "Cadastro concluido!",
          message: location.state.mensagem,
        }
      : null,
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setAlerta(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlerta(null);

    // Login fixo de admin (sem precisar do backend)
    if (form.email === ADMIN.email && form.senha === ADMIN.senha) {
      localStorage.setItem("usuario", JSON.stringify(ADMIN));
      navigate("/");
      return;
    }

    // Login normal pelo backend
    fetch(
      "https://pmg-es-2026-1-ti2-3740100-lagodosol.onrender.com/usuarios/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, senha: form.senha }),
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao fazer login");
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("usuario", JSON.stringify(data));
        localStorage.setItem("usuarioId", data.id);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setAlerta({
          type: "error",
          title: "Nao foi possivel entrar",
          message: "Confira seu e-mail e senha e tente novamente.",
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
            <h2>ENTRAR NA CONTA</h2>

            <AlertMessage
              type={alerta?.type}
              title={alerta?.title}
              message={alerta?.message}
              onClose={() => setAlerta(null)}
            />

            <form onSubmit={handleSubmit} className="form">
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

              <button type="submit" className="btn-cadastrar">
                Login
              </button>

              <p className="login-link">
                Nao possui uma conta? <Link to="/cadastro">Cadastrar</Link>
              </p>
            </form>

            <div className="termos">
              <p>
                Ao entrar, voce concorda com nossos termos de uso e politica de
                privacidade.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
