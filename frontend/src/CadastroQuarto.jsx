import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import AlertMessage from "./components/AlertMessage";

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
  const [alerta, setAlerta] = useState(null);

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
    let cancelado = false;

    async function carregarQuartos() {
      try {
        const response = await fetch("http://localhost:8080/quartos");
        const data = await response.json();

        if (!cancelado) {
          setQuartos(data);
        }
      } catch (error) {
        console.error("Erro ao buscar quartos:", error);
      }
    }

    carregarQuartos();

    return () => {
      cancelado = true;
    };
  }, []);

  // =========================
  // ALTERAR INPUTS
  // =========================
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setAlerta(null);
  }

  function handleImagensChange(e) {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;
    setAlerta(null);

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
    setAlerta(null);

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
        setAlerta({
          type: "error",
          title: "Erro ao salvar quarto",
          message: "Revise os dados informados e tente novamente.",
        });
        return;
      }

      setAlerta({
        type: "success",
        title: editandoId ? "Quarto atualizado" : "Quarto cadastrado",
        message: editandoId
          ? "As alterações do quarto foram salvas."
          : "O novo quarto foi cadastrado com sucesso.",
      });

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
      setAlerta({
        type: "error",
        title: "Erro de conexão",
        message: "Não foi possível conectar com o servidor.",
      });
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
        setAlerta({
          type: "error",
          title: "Erro ao excluir quarto",
          message: "Tente novamente em alguns instantes.",
        });
        return;
      }

      setAlerta({
        type: "success",
        title: "Quarto excluído",
        message: "O quarto foi removido com sucesso.",
      });

      buscarQuartos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setAlerta({
        type: "error",
        title: "Erro de conexão",
        message: "Não foi possível conectar com o servidor.",
      });
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
    <header style={styles.hero}>
      <img src={logo} alt="Lago do Sol" style={styles.heroLogo} />

      <div>
        <h1 style={styles.heroTitle}>Gestão de Quartos</h1>
        <p style={styles.heroSubtitle}>
          Cadastre, edite e organize as acomodações do hotel.
        </p>
      </div>
    </header>


    <div style={styles.dashboard}>
      <section style={styles.formCard}>
        <h2>
          {editandoId ? "Editar Quarto" : "Novo Quarto"}
        </h2>

        <AlertMessage
          type={alerta?.type}
          title={alerta?.title}
          message={alerta?.message}
          onClose={() => setAlerta(null)}
        />

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            name="numero"
            placeholder="Número do quarto"
            value={form.numero}
            onChange={handleChange}
          />

          <select
            style={styles.input}
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="">Tipo do quarto</option>
            <option value="Standard">Standard</option>
            <option value="Luxo">Luxo</option>
            <option value="Suite">Suíte</option>
          </select>

          <input
            style={styles.input}
            type="number"
            name="capacidade"
            placeholder="Capacidade"
            value={form.capacidade}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="number"
            name="preco"
            placeholder="Preço da diária"
            value={form.preco}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagensChange}
          />

          {form.imagens.length > 0 && (
            <div style={styles.previewGrid}>
              {form.imagens.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  style={styles.preview}
                />
              ))}
            </div>
          )}

          <button style={styles.saveBtn}>
            {editandoId
              ? "Salvar Alterações"
              : "Cadastrar Quarto"}
          </button>
        </form>
      </section>

      <section style={styles.listSection}>
        <h2>Quartos Cadastrados</h2>

        {quartos.map((quarto) => (
          <div key={quarto.id} style={styles.roomCard}>
            <img
              src={
                quarto.imagens?.[0] ||
                "https://via.placeholder.com/300x200"
              }
              alt=""
              style={styles.roomImage}
            />

            <div style={styles.roomInfo}>
              <div style={styles.roomHeader}>
                <h3>
                  {quarto.tipo} #{quarto.numero}
                </h3>

                <span style={styles.badge}>
                  {quarto.capacidade} hóspedes
                </span>
              </div>

              <p style={styles.price}>
                R$ {quarto.preco}/noite
              </p>

              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => editarQuarto(quarto)}
                >
                  Editar
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    excluirQuarto(quarto.id)
                  }
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
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
    padding: "18px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  quartoConteudo: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "18px",
    alignItems: "start",
  },

  imagemArea: {
    width: "100%",
  },

  semImagem: {
    width: "100%",
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2f7",
    color: "#64748b",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  quartoDetalhes: {
    minWidth: 0,
  },

  quartoTopo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  quartoNumero: {
    color: "#173f46",
    fontSize: "18px",
  },

  tipoBadge: {
    padding: "6px 10px",
    background: "#e7f5f4",
    color: "#176b67",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  quartoInfoLinha: {
    margin: "0 0 8px",
    color: "#475569",
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

  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
    marginBottom: "18px",
  },

  previewImagem: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  imagemQuarto: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
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

  hero: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px",
},

heroLogo: {
  width: "80px",
},

heroTitle: {
  margin: 0,
  color: "#173f46",
},

heroSubtitle: {
  color: "#64748b",
},



dashboard: {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
},

formCard: {
  background: "#fff",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
  height: "fit-content",
},

listSection: {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
},

roomCard: {
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
},

roomImage: {
  width: "100%",
  height: "220px",
  objectFit: "cover",
},

roomInfo: {
  padding: "20px",
},

roomHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

badge: {
  background: "#e8f7f4",
  color: "#0f766e",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "13px",
},

price: {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#173f46",
},

actions: {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
},

saveBtn: {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  background: "#173f46",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
},

preview: {
  width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: "8px",
},
};

