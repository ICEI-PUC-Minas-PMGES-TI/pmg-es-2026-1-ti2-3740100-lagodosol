import "../App.css";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import logo from "../assets/logo.jpg";
import AlertMessage from "../components/AlertMessage";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", senha: "" });
  const [alerta, setAlerta] = useState(null);

  // Exibe mensagem vinda do cadastro
  useEffect(() => {
    if (location.state?.mensagem) {
      setAlerta({
        type: "success",
        title: "Cadastro concluído!",
        message: location.state.mensagem,
      });
    }
  }, [location.state]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setAlerta(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlerta(null);

    fetch("http://localhost:8080/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, senha: form.senha }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao fazer login");
        return response.json();
      })
      .then((data) => {
        // Salva o usuário no localStorage para a Home reconhecer
        localStorage.setItem("usuario", JSON.stringify(data));

        // Redireciona para a Home já logado
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setAlerta({
          type: "error",
          title: "Não foi possível entrar",
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
                Não possui uma conta? <Link to="/cadastro">Cadastrar</Link>
              </p>
            </form>

            <div className="termos">
              <p>
                Ao entrar, você concorda com nossos termos de uso e política de
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
