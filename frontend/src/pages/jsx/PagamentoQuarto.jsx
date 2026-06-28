import { useState, useEffect, useRef } from "react";
import "../style/PagamentoQuarto.css";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const API = "http://localhost:8081";

function PagamentoQuarto() {
  const navigate = useNavigate();
  const location = useLocation();

  // ID da reserva recém-criada, recebido da tela de Reserva de Quarto
  const reservaId = location.state?.reservaId ?? null;

  // Dados simulados da reserva
  const reserva = {
    quarto: "Suite Luxo - 302",
    checkIn: "2026-05-15",
    checkOut: "2026-05-18",
    diarias: 3,
    precoPorNoite: 320.0,
    extras: [
      { item: "Café da manhã", valor: 45.0 },
      { item: "Estacionamento", valor: 30.0 },
    ],
  };

  // Gerar ID de transação único
  const [idTransacao, setIdTransacao] = useState("");
  const qrRef = useRef();

  useEffect(() => {
    const id = `LAGO${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setIdTransacao(id);
  }, []);

  function downloadQRCode() {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-pix-${idTransacao}.png`;
    link.click();
  }

  const subtotalDiarias = reserva.diarias * reserva.precoPorNoite;
  const subtotalExtras = reserva.extras.reduce((acc, e) => acc + e.valor, 0);
  const total = subtotalDiarias + subtotalExtras;

  const [metodoPagamento, setMetodoPagamento] = useState("cartao");
  const [parcelas, setParcelas] = useState("1");
  const [form, setForm] = useState({
    nomeCartao: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
    cpfPix: "",
  });
  const [pago, setPago] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // ── Avaliação da estadia (estrelas) ──
  const [avaliacao, setAvaliacao] = useState(0);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);
  const [erroAvaliacao, setErroAvaliacao] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  function formatarCartao(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  }

  function formatarValidade(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
  }

  function validar() {
    if (metodoPagamento === "cartao" || metodoPagamento === "debito") {
      if (!form.nomeCartao.trim()) return "Informe o nome no cartão.";
      if (form.numeroCartao.replace(/\s/g, "").length < 16)
        return "Número do cartão inválido.";
      if (form.validade.length < 5) return "Validade inválida.";
      if (form.cvv.length < 3) return "CVV inválido.";
    }
    if (metodoPagamento === "pix") {
      if (form.cpfPix.replace(/\D/g, "").length < 11)
        return "CPF para PIX inválido.";
    }
    return "";
  }

  // Função que envia os dados para o seu Back-end
  async function handleSubmit() {
    const erroMsg = validar();
    if (erroMsg) {
      setErro(erroMsg);
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      // Fazendo a requisição para o Node.js
      const resposta = await fetch("http://localhost:8081/pagamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metodoPagamento: metodoPagamento,
          parcelas: metodoPagamento === "cartao" ? parseInt(parcelas) : 1,
          valorTotal: total,
          nomeCartao: form.nomeCartao,
          cpfPix: form.cpfPix,
        }),
      });

      if (resposta.ok) {
        setPago(true);
      } else {
        setErro("Erro ao processar pagamento.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro(
        "Falha na comunicação com o servidor. Verifique se o back-end está rodando.",
      );
    } finally {
      setCarregando(false);
    }
  }

  // Envia a avaliação de estrelas para a reserva, para alimentar
  // o indicador de satisfação no Dashboard do admin
  async function enviarAvaliacao(estrelas) {
    if (!reservaId) {
      setErroAvaliacao(
        "Não foi possível identificar a reserva para registrar a avaliação."
      );
      return;
    }

    setAvaliacao(estrelas);
    setEnviandoAvaliacao(true);
    setErroAvaliacao("");

    try {
      const response = await fetch(`${API}/reservas/${reservaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avaliacao: estrelas }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível salvar a avaliação.");
      }

      setAvaliacaoEnviada(true);
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
      setErroAvaliacao("Não foi possível salvar sua avaliação. Tente novamente.");
    } finally {
      setEnviandoAvaliacao(false);
    }
  }

  if (pago) {
    return (
      <div className="pagamento-wrapper">
        <Header />
        <main className="pagamento-container">
          <div className="card-pagamento sucesso-card">
            <div className="sucesso-icone">✓</div>
            <h2>Pagamento Confirmado!</h2>
            <p className="sucesso-msg">
              Sua reserva foi confirmada com sucesso. Um e-mail de confirmação
              será enviado em breve.
            </p>
            <div className="sucesso-detalhes">
              <span>
                <strong>Quarto:</strong> {reserva.quarto}
              </span>
              <span>
                <strong>Check-in:</strong>{" "}
                {new Date(reserva.checkIn + "T12:00:00").toLocaleDateString(
                  "pt-BR",
                )}
              </span>
              <span>
                <strong>Check-out:</strong>{" "}
                {new Date(reserva.checkOut + "T12:00:00").toLocaleDateString(
                  "pt-BR",
                )}
              </span>
              <span>
                <strong>Total pago:</strong> R${" "}
                {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* ── Avaliação da estadia ── */}
            <div className="avaliacao-pagamento">
              <p className="avaliacao-titulo">Avalie sua experiência</p>

              <div className="avaliacao-estrelas">
                {[1, 2, 3, 4, 5].map((valor) => (
                  <span
                    key={valor}
                    className={`avaliacao-star ${
                      valor <= avaliacao ? "filled" : ""
                    } ${avaliacaoEnviada ? "" : "clickable"}`}
                    onClick={() => !avaliacaoEnviada && enviarAvaliacao(valor)}
                  >
                    {valor <= avaliacao ? "★" : "☆"}
                  </span>
                ))}
              </div>

              {enviandoAvaliacao && (
                <p className="avaliacao-status">Salvando avaliação...</p>
              )}

              {avaliacaoEnviada && !enviandoAvaliacao && (
                <p className="avaliacao-status avaliacao-sucesso">
                  Obrigado pela sua avaliação!
                </p>
              )}

              {erroAvaliacao && (
                <p className="avaliacao-status avaliacao-erro">{erroAvaliacao}</p>
              )}

              {!reservaId && (
                <p className="avaliacao-status avaliacao-erro">
                  Avaliação indisponível para esta reserva.
                </p>
              )}
            </div>

            <button className="btn-confirmar" onClick={() => navigate("/")}>
              Voltar ao Início
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pagamento-wrapper">
      <Header />

      <main className="pagamento-container">
        <div className="pagamento-grid">
          {/* ── Resumo da Reserva ── */}
          <div className="card-pagamento resumo-card">
            <h2>Resumo da Reserva</h2>

            <div className="resumo-quarto">
              <span className="resumo-icone">🏨</span>
              <div>
                <p className="resumo-titulo">{reserva.quarto}</p>
                <p className="resumo-datas">
                  {new Date(reserva.checkIn + "T12:00:00").toLocaleDateString(
                    "pt-BR",
                  )}{" "}
                  →{" "}
                  {new Date(reserva.checkOut + "T12:00:00").toLocaleDateString(
                    "pt-BR",
                  )}
                </p>
              </div>
            </div>

            <div className="resumo-linha">
              <span>
                {reserva.diarias} diária(s) × R${" "}
                {reserva.precoPorNoite.toFixed(2).replace(".", ",")}
              </span>
              <span>R$ {subtotalDiarias.toFixed(2).replace(".", ",")}</span>
            </div>

            {reserva.extras.map((extra, i) => (
              <div className="resumo-linha" key={i}>
                <span>{extra.item}</span>
                <span>R$ {extra.valor.toFixed(2).replace(".", ",")}</span>
              </div>
            ))}

            <div className="resumo-divisor" />

            <div className="resumo-linha resumo-total">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          {/* ── Pagamento ── */}
          <div className="card-pagamento form-card">
            <h2>Forma de Pagamento</h2>

            {/* Seletor de método */}
            <div className="metodos">
              <button
                className={`metodo-btn ${metodoPagamento === "cartao" ? "ativo" : ""}`}
                onClick={() => setMetodoPagamento("cartao")}
              >
                💳 Cartão de Crédito
              </button>
              <button
                className={`metodo-btn ${metodoPagamento === "debito" ? "ativo" : ""}`}
                onClick={() => setMetodoPagamento("debito")}
              >
                💳 Cartão de Débito
              </button>
              <button
                className={`metodo-btn ${metodoPagamento === "pix" ? "ativo" : ""}`}
                onClick={() => setMetodoPagamento("pix")}
              >
                ⚡ PIX
              </button>
            </div>

            {/* Formulário Cartão */}
            {(metodoPagamento === "cartao" || metodoPagamento === "debito") && (
              <div className="form-pagamento">
                <div className="form-group">
                  <label>Nome no Cartão</label>
                  <input
                    type="text"
                    name="nomeCartao"
                    placeholder="Como está no cartão"
                    value={form.nomeCartao}
                    onChange={handleChange}
                    className="input-pag"
                  />
                </div>

                <div className="form-group">
                  <label>Número do Cartão</label>
                  <input
                    type="text"
                    name="numeroCartao"
                    placeholder="0000 0000 0000 0000"
                    value={form.numeroCartao}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        numeroCartao: formatarCartao(e.target.value),
                      })
                    }
                    className="input-pag"
                    maxLength={19}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Validade</label>
                    <input
                      type="text"
                      name="validade"
                      placeholder="MM/AA"
                      value={form.validade}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          validade: formatarValidade(e.target.value),
                        })
                      }
                      className="input-pag"
                      maxLength={5}
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="000"
                      value={form.cvv}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        })
                      }
                      className="input-pag"
                      maxLength={3}
                    />
                  </div>
                </div>

                {metodoPagamento === "cartao" && (
                  <div className="form-group">
                    <label>Parcelas</label>
                    <select
                      className="input-pag"
                      value={parcelas}
                      onChange={(e) => setParcelas(e.target.value)}
                    >
                      {[1, 2, 3, 6, 12].map((p) => (
                        <option key={p} value={p}>
                          {p}x de R$ {(total / p).toFixed(2).replace(".", ",")}
                          {p === 1 ? " (à vista)" : " sem juros"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Formulário PIX */}
            {metodoPagamento === "pix" && (
              <div className="form-pagamento pix-area">
                <div className="pix-qrcode">
                  {idTransacao && (
                    <div ref={qrRef}>
                      <QRCodeCanvas
                        value={`LAGODOSOL|${idTransacao}|${total.toFixed(2)}|${reserva.quarto}`}
                        size={200}
                        level="H"
                        includeMargin={true}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                      />
                    </div>
                  )}
                  <p style={{ marginTop: "12px", fontSize: "12px", color: "#666" }}>
                    ID: {idTransacao}
                  </p>
                  <button
                    type="button"
                    onClick={downloadQRCode}
                    style={{
                      marginTop: "8px",
                      padding: "6px 12px",
                      fontSize: "11px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    📥 Baixar QR Code
                  </button>
                </div>

                <p className="pix-ou">ou informe seu CPF para gerar o PIX</p>

                <div className="form-group">
                  <label>CPF do titular</label>
                  <input
                    type="text"
                    name="cpfPix"
                    placeholder="000.000.000-00"
                    value={form.cpfPix}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        cpfPix: e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{3})(\d)/, "$1.$2")
                          .replace(/(\d{3})(\d)/, "$1.$2")
                          .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                          .slice(0, 14),
                      })
                    }
                    className="input-pag"
                  />
                </div>

                <div className="pix-info">
                  <span>⏱️</span> O pagamento é confirmado em até 30 segundos
                </div>
              </div>
            )}

            {erro && <p className="erro-msg">⚠️ {erro}</p>}

            <button
              className="btn-confirmar"
              onClick={handleSubmit}
              disabled={carregando}
              style={{
                opacity: carregando ? 0.7 : 1,
                cursor: carregando ? "not-allowed" : "pointer",
              }}
            >
              {carregando
                ? "Processando..."
                : `Confirmar Pagamento · R$ ${total.toFixed(2).replace(".", ",")}`}
            </button>

            <p className="seguranca-msg">🔒 Pagamento seguro e criptografado</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PagamentoQuarto;
