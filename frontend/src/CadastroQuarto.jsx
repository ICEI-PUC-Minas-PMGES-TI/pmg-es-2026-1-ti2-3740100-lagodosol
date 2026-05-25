import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.jpg";

export default function CadastroQuarto() {
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    capacidade: "",
    preco: "",
    imagens: [],
  });

  const [quartos, setQuartos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // =========================
  // BUSCAR QUARTOS
  // =========================
  async function buscarQuartos() {
    try {
      const response = await fetch("http://localhost:8080/quartos");
      const data = await response.json();
      setQuartos(data);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
    }
  }

  useEffect(() => {
    buscarQuartos();
  }, []);

  // =========================
  // ALTERAR INPUTS
  // =========================
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImagensChange(e) {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((imagensBase64) => {
      setForm({
        ...form,
        imagens: imagensBase64,
      });
    });
  }

  // =========================
  // CADASTRAR OU EDITAR
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url = editandoId
        ? `http://localhost:8080/quartos/${editandoId}`
        : "http://localhost:8080/quartos";

      const metodo = editandoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        alert("Erro ao salvar quarto.");
        return;
      }

      alert(
        editandoId
          ? "Quarto atualizado com sucesso!"
          : "Quarto cadastrado com sucesso!"
      );

      setForm({
        numero: "",
        tipo: "",
        capacidade: "",
        preco: "",
        imagens: [],
      });

      setEditandoId(null);

      buscarQuartos();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  // =========================
  // EXCLUIR
  // =========================
  async function excluirQuarto(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este quarto?"
    );

    if (!confirmar) return;

    try {
      const response = await fetch(
        `http://localhost:8080/quartos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert("Erro ao excluir quarto.");
        return;
      }

      alert("Quarto excluído com sucesso!");

      buscarQuartos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  // =========================
  // EDITAR
  // =========================
  function editarQuarto(quarto) {
    setForm({
      numero: quarto.numero,
      tipo: quarto.tipo,
      capacidade: quarto.capacidade,
      preco: quarto.preco,
      imagens: quarto.imagens || [],
    });

    setEditandoId(quarto.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

        {/* FORMULÁRIO */}
        <section style={styles.card}>
          <h2 style={styles.title}>
            {editandoId
              ? "EDITAR QUARTO"
              : "CADASTRO DE QUARTO"}
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>
              Número do quarto
            </label>

            <input
              type="text"
              name="numero"
              placeholder="Ex: 101"
              value={form.numero}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>
              Imagens do quarto
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagensChange}
              style={styles.input}
            />

            {form.imagens && (
              <img
                src={form.imagens}
                alt="Prévia do quarto"
                style={styles.previewImagem}
              />
            )}

            <label style={styles.label}>
              Tipo do quarto
            </label>

            <input
              type="text"
              name="tipo"
              placeholder="Ex: Luxo, Standard, Suíte"
              value={form.tipo}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>
              Capacidade
            </label>

            <input
              type="number"
              name="capacidade"
              placeholder="Ex: 2"
              value={form.capacidade}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>
              Preço da diária
            </label>

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
              {editandoId
                ? "Salvar Alterações"
                : "Cadastrar Quarto"}
            </button>

            <Link to="/" style={styles.link}>
              Voltar para Home
            </Link>
          </form>
        </section>

        {/* LISTA DE QUARTOS */}
        <section style={styles.listaSection}>
          <h2 style={styles.listaTitulo}>
            QUARTOS CADASTRADOS
          </h2>

          {quartos.length === 0 ? (
            <p>Nenhum quarto cadastrado.</p>
          ) : (
            quartos.map((quarto) => (
              <div key={quarto.id} style={styles.quartoCard}>
                {quarto.imagens && quarto.imagens.length > 0 && (
                  <img
                    src={quarto.imagens[0]}
                    alt={`Capa do quarto ${quarto.numero}`}
                    style={styles.imagemQuarto}
                  />
                )}
                {quarto.imagens && quarto.imagens.length > 1 && (
                  <div style={styles.galeria}>
                    {quarto.imagens.slice(1).map((imagem, index) => (
                      <img
                        key={index}
                        src={imagem}
                        alt={`Foto ${index + 2} do quarto`}
                        style={styles.miniatura}
                      />
                    ))}
                  </div>
                )}
                {quarto.imagem && (
                  <img
                    src={quarto.imagem}
                    alt={`Quarto ${quarto.numero}`}
                    style={styles.imagemQuarto}
                  />
                )}
                <p>
                  <strong>Número:</strong>{" "}
                  {quarto.numero}
                </p>

                <p>
                  <strong>Tipo:</strong>{" "}
                  {quarto.tipo}
                </p>

                <p>
                  <strong>Capacidade:</strong>{" "}
                  {quarto.capacidade}
                </p>

                <p>
                  <strong>Preço:</strong> R${" "}
                  {quarto.preco}
                </p>

                <div style={styles.botoesArea}>
                  <button
                    style={styles.editarBtn}
                    onClick={() => editarQuarto(quarto)}
                  >
                    Editar
                  </button>

                  <button
                    style={styles.excluirBtn}
                    onClick={() =>
                      excluirQuarto(quarto.id)
                    }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6f8",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "40px",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 20px",
  },

  logoImg: {
    width: "150px",
    marginBottom: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: "35px",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  link: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    textDecoration: "none",
    color: "#333",
  },

  listaSection: {
    width: "100%",
    maxWidth: "900px",
  },

  listaTitulo: {
    textAlign: "center",
    marginBottom: "25px",
  },

  quartoCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  botoesArea: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  editarBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#f0ad4e",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  excluirBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#d9534f",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  previewImagem: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "18px",
  },

  imagemQuarto: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  galeria: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "15px",
  },

  miniatura: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
};

