import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.jpg";

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
      <main style={styles.main}>
<header style={styles.header}>
  <div style={styles.headerContainer}>
    <img
  src={logo}
  alt="Logo Lago do Sol"
  style={styles.logoImg}
/>

  </div>
</header>

        <section style={styles.card}>
          <h2 style={styles.title}>CADASTRO DE QUARTO</h2>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Número do quarto</label>
            <input
              type="text"
              name="numero"
              placeholder="Ex: 101"
              value={form.numero}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>Tipo do quarto</label>
            <input
              type="text"
              name="tipo"
              placeholder="Ex: Luxo, Standard, Suíte"
              value={form.tipo}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>Capacidade</label>
            <input
              type="number"
              name="capacidade"
              placeholder="Ex: 2"
              value={form.capacidade}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>Preço da diária</label>
            <input
              type="number"
              name="preco"
              placeholder="Ex: 350"
              value={form.preco}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Cadastrar Quarto
            </button>

            <Link to="/" style={styles.link}>
              Voltar para Home
            </Link>
          </form>
        </section>
      </main>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f5f6f8",
    fontFamily: "Arial, sans-serif",
    color: "#1f2933",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px 20px",
  },

  logoArea: {
    textAlign: "center",
    marginBottom: "25px",
  },

  logoCircle: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    background: "#ffd447",
    color: "#1f7a8c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    margin: "0 auto 8px",
  },
 logoImg: {
  width: "150px",
  height: "auto",
  display: "block",
  margin: "0 auto 25px",
},

nav: {
  display: "flex",
  justifyContent: "center",
  gap: "22px",
  marginBottom: "0px",
  flexWrap: "wrap",
},

navLink: {
  textDecoration: "none",
  color: "#1f2933",
  fontSize: "14px",
  fontWeight: "600",
},

  logoText: {
    fontSize: "16px",
    color: "#1f7a8c",
    fontWeight: "600",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "34px 30px",
    borderRadius: "12px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "26px",
    letterSpacing: "0.5px",
    color: "#1f2933",
  },

  label: {
    display: "block",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#263238",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "17px",
    border: "1px solid #cfcfcf",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "13px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    marginTop: "8px",
  },

  link: {
    display: "block",
    textAlign: "center",
    marginTop: "16px",
    color: "#3b3b3b",
    textDecoration: "none",
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
    padding: "18px",
    background: "#f0f0f0",
    color: "#666",
    fontSize: "13px",
  },
};