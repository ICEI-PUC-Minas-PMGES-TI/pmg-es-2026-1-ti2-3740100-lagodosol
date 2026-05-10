import React, { useState } from "react";

export default function CadastroQuarto() {
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    capacidade: "",
    preco: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

 async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3001/quartos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.erro);
      return;
    }

    alert(data.mensagem);

    setForm({
      numero: "",
      tipo: "",
      capacidade: "",
      preco: "",
    });

    console.log("Quarto cadastrado:", data.quarto);
  } catch (error) {
    console.error("Erro ao cadastrar quarto:", error);
    alert("Erro ao conectar com o servidor.");
  }
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
          <h2>Cadastro de Quarto</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="numero"
              placeholder="Número do Quarto"
              value={form.numero}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="text"
              name="tipo"
              placeholder="Tipo do Quarto"
              value={form.tipo}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="number"
              name="capacidade"
              placeholder="Capacidade de Pessoas"
              value={form.capacidade}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="number"
              name="preco"
              placeholder="Preço da Diária"
              value={form.preco}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Cadastrar Quarto
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
    background: "#f4f4f4",
  },

  formContainer: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "320px",
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