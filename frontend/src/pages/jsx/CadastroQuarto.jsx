import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";

const API = "http://localhost:8081";

export default function CadastroQuarto() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editandoId = searchParams.get("id");

  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    capacidade: "",
    preco: "",
    imagemBase64: "",
  });

  const [mensagem, setMensagem] = useState(null);

  // Se vier ?id=X, carrega o quarto para edição
  useEffect(() => {
    if (!editandoId) return;

    fetch(`${API}/quartos/${editandoId}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          numero: data.numero || "",
          tipo: data.tipo || "",
          capacidade: data.capacidade || "",
          preco: data.preco || "",
          imagemBase64: data.imagemBase64 || "",
        });
      })
      .catch((err) => console.error("Erro ao carregar quarto:", err));
  }, [editandoId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensagem(null);
  }

  function handleImagem(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imagemBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);

    const url = editandoId ? `${API}/quartos/${editandoId}` : `${API}/quartos`;
    const metodo = editandoId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: form.numero,
          tipo: form.tipo,
          capacidade: Number(form.capacidade),
          preco: Number(form.preco),
          imagemBase64: form.imagemBase64,
        }),
      });

      if (!response.ok) {
        setMensagem({ tipo: "erro", texto: "Erro ao salvar quarto. Tente novamente." });
        return;
      }

      setMensagem({
        tipo: "sucesso",
        texto: editandoId ? "Quarto atualizado com sucesso!" : "Quarto cadastrado com sucesso!",
      });

      setTimeout(() => navigate("/quartos"), 1200);
    } catch (error) {
      console.error("Erro:", error);
      setMensagem({ tipo: "erro", texto: "Não foi possível conectar com o servidor." });
    }
  }

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <header style={styles.header}>
          <img src={logo} alt="Logo Lago do Sol" style={styles.logoImg} />
        </header>

        <section style={styles.card}>
          <h2 style={styles.title}>
            {editandoId ? "EDITAR QUARTO" : "CADASTRO DE QUARTO"}
          </h2>

          {mensagem && (
            <div style={{
              ...styles.alerta,
              background: mensagem.tipo === "sucesso" ? "#d4edda" : "#f8d7da",
              color: mensagem.tipo === "sucesso" ? "#155724" : "#721c24",
              borderColor: mensagem.tipo === "sucesso" ? "#c3e6cb" : "#f5c6cb",
            }}>
              {mensagem.texto}
            </div>
          )}

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

            <label style={styles.label}>Preço da diária (R$)</label>
            <input
              type="number"
              name="preco"
              placeholder="Ex: 350"
              value={form.preco}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>Imagem do quarto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagem}
              style={styles.input}
            />

            {form.imagemBase64 && (
              <img
                src={form.imagemBase64}
                alt="Prévia do quarto"
                style={styles.previewImagem}
              />
            )}

            <button type="submit" style={styles.button}>
              {editandoId ? "Salvar Alterações" : "Cadastrar Quarto"}
            </button>

            <Link to="/quartos" style={styles.link}>
              Voltar para Gestão de Quartos
            </Link>
          </form>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f6f8", fontFamily: "Arial, sans-serif", paddingBottom: "40px" },
  main: { display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px" },
  header: { marginBottom: "10px" },
  logoImg: { width: "150px", marginBottom: "20px" },
  card: { width: "100%", maxWidth: "450px", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", marginBottom: "35px" },
  title: { textAlign: "center", marginBottom: "25px" },
  alerta: { padding: "12px", borderRadius: "6px", border: "1px solid", marginBottom: "18px", fontSize: "14px" },
  label: { display: "block", marginBottom: "8px", fontWeight: "bold" },
  input: { width: "100%", padding: "12px", marginBottom: "18px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "#0d5c63", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  link: { display: "block", marginTop: "15px", textAlign: "center", textDecoration: "none", color: "#555" },
  previewImagem: { width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "18px" },
};
