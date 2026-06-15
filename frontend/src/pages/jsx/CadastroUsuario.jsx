import { useState } from "react";

export default function CadastroUsuario() {
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
    console.log("Usuário cadastrado:", form);
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logo}>ícone</div>

          <nav style={styles.nav}>
            <a href="#">HOTEL</a>
            <a href="#">ACOMODAÇÕES</a>
            <a href="#">PACOTES</a>
            <a href="#">GASTRONOMIA</a>
            <a href="#">EVENTOS</a>
            <a href="#">CORPORATIVO</a>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <h2>Cadastro de Usuário</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>©2022 Hotel Lago do Sol | CNPJ: 37.790.093/0001-05</p>
      </footer>
    </div>
  );
}

/* ESTILOS */
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  header: {
    background: "#333",
    color: "#fff",
    padding: "10px 0",
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  logo: {
    fontWeight: "bold",
  },

  nav: {
    display: "flex",
    gap: "15px",
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  footer: {
    background: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
  },
};
