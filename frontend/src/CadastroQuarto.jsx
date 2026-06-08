import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.jpg";
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

          <AlertMessage
            type={alerta?.type}
            title={alerta?.title}
            message={alerta?.message}
            onClose={() => setAlerta(null)}
          />

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

            {form.imagens.length > 0 && (
              <div style={styles.previewGrid}>
                {form.imagens.map((imagem, index) => (
                  <img
                    key={index}
                    src={imagem}
                    alt={`Prévia ${index + 1} do quarto`}
                    style={styles.previewImagem}
                  />
                ))}
              </div>
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
                <div style={styles.quartoConteudo}>
                  <div style={styles.imagemArea}>
                    {quarto.imagens && quarto.imagens.length > 0 ? (
                      <img
                        src={quarto.imagens[0]}
                        alt={`Capa do quarto ${quarto.numero}`}
                        style={styles.imagemQuarto}
                      />
                    ) : quarto.imagem ? (
                      <img
                        src={quarto.imagem}
                        alt={`Quarto ${quarto.numero}`}
                        style={styles.imagemQuarto}
                      />
                    ) : (
                      <div style={styles.semImagem}>Sem imagem</div>
                    )}
                  </div>

                  <div style={styles.quartoDetalhes}>
                    <div style={styles.quartoTopo}>
                      <strong style={styles.quartoNumero}>Quarto {quarto.numero}</strong>
                      <span style={styles.tipoBadge}>{quarto.tipo}</span>
                    </div>

                    <p style={styles.quartoInfoLinha}>
                      <strong>Capacidade:</strong> {quarto.capacidade} pessoa(s)
                    </p>

                    <p style={styles.quartoInfoLinha}>
                      <strong>Diária:</strong> R$ {quarto.preco}
                    </p>

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
                  </div>
                </div>

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
};

