import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const API = "http://localhost:8081";

export default function CadastroQuarto() {
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    capacidade: "",
    preco: "",
  });

  const [quartos, setQuartos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  async function buscarQuartos() {
    try {
      const response = await fetch(`${API}/quartos`);
      const data = await response.json();
      setQuartos(data);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
    }
  }

  useEffect(() => {
    buscarQuartos();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensagem(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);

    try {
      const url = editandoId
        ? `${API}/quartos/${editandoId}`
        : `${API}/quartos`;

      const metodo = editandoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: form.numero,
          tipo: form.tipo,
          capacidade: Number(form.capacidade),
          preco: Number(form.preco),
        }),
      });

      if (!response.ok) {
        setMensagem({ tipo: "erro", texto: "Erro ao salvar quarto. Tente novamente." });
        return;
      }

      setMensagem({
        tipo: "sucesso",
        texto: editandoId
          ? "Quarto atualizado com sucesso!"
          : "Quarto cadastrado com sucesso!",
      });

      setForm({ numero: "", tipo: "", capacidade: "", preco: "" });
      setEditandoId(null);
      buscarQuartos();
    } catch (error) {
      console.error("Erro:", error);
      setMensagem({ tipo: "erro", texto: "Não foi possível conectar com o servidor." });
    }
  }

  async function excluirQuarto(id) {
    if (!window.confirm("Deseja realmente excluir este quarto?")) return;

    try {
      const response = await fetch(`${API}/quartos/${id}`, { method: "DELETE" });

      if (!response.ok) {
        setMensagem({ tipo: "erro", texto: "Erro ao excluir quarto." });
        return;
      }

      setMensagem({ tipo: "sucesso", texto: "Quarto excluído com sucesso!" });
      buscarQuartos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setMensagem({ tipo: "erro", texto: "Não foi possível conectar com o servidor." });
    }
  }

  function editarQuarto(quarto) {
    setForm({
      numero: quarto.numero,
      tipo: quarto.tipo,
      capacidade: quarto.capacidade,
      preco: quarto.preco,
    });
    setEditandoId(quarto.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <header style={styles.header}>
          <img src={logo} alt="Logo Lago do Sol" style={styles.logoImg} />
        </header>

        {/* FORMULÁRIO */}
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

            <button type="submit" style={styles.button}>
              {editandoId ? "Salvar Alterações" : "Cadastrar Quarto"}
            </button>

            {editandoId && (
              <button
                type="button"
                onClick={() => { setEditandoId(null); setForm({ numero: "", tipo: "", capacidade: "", preco: "" }); }}
                style={{ ...styles.button, background: "#888", marginTop: "10px" }}
              >
                Cancelar Edição
              </button>
            )}

            <Link to="/quartos" style={styles.link}>
              Voltar para Gestão de Quartos
            </Link>
          </form>
        </section>

        {/* LISTA DE QUARTOS */}
        <section style={styles.listaSection}>
          <h2 style={styles.listaTitulo}>QUARTOS CADASTRADOS</h2>

          {quartos.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>Nenhum quarto cadastrado.</p>
          ) : (
            quartos.map((quarto) => (
              <div key={quarto.id} style={styles.quartoCard}>
                <p><strong>Número:</strong> {quarto.numero}</p>
                <p><strong>Tipo:</strong> {quarto.tipo}</p>
                <p><strong>Capacidade:</strong> {quarto.capacidade} pessoa(s)</p>
                <p><strong>Preço:</strong> R$ {quarto.preco}</p>

                <div style={styles.botoesArea}>
                  <button style={styles.editarBtn} onClick={() => editarQuarto(quarto)}>
                    Editar
                  </button>
                  <button style={styles.excluirBtn} onClick={() => excluirQuarto(quarto.id)}>
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
  listaSection: { width: "100%", maxWidth: "900px" },
  listaTitulo: { textAlign: "center", marginBottom: "25px" },
  quartoCard: { background: "#fff", padding: "20px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  botoesArea: { display: "flex", gap: "10px", marginTop: "15px" },
  editarBtn: { flex: 1, padding: "10px", border: "none", borderRadius: "6px", background: "#f0ad4e", color: "#fff", cursor: "pointer", fontWeight: "bold" },
  excluirBtn: { flex: 1, padding: "10px", border: "none", borderRadius: "6px", background: "#d9534f", color: "#fff", cursor: "pointer", fontWeight: "bold" },
};
