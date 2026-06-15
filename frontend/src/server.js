import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/pagamentos", (req, res) => {
  const { reserva, metodoPagamento, parcelas = 1, dadosFormulario } = req.body;

  if (!metodoPagamento || !reserva) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Dados incompletos para processar o pagamento.",
    });
  }

  if (metodoPagamento === "cartao" || metodoPagamento === "debito") {
    const numeroCartao = dadosFormulario?.numeroCartao || "";

    if (numeroCartao.replace(/\s/g, "").length < 16) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Cartao invalido.",
      });
    }
  }

  if (metodoPagamento === "pix" && !dadosFormulario?.cpfPix) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "CPF obrigatorio para PIX.",
    });
  }

  console.log("Processando pagamento...");
  console.log("Quarto:", reserva.quarto);
  console.log("Metodo:", metodoPagamento);
  console.log("Parcelas:", parcelas);

  setTimeout(() => {
    return res.status(200).json({
      sucesso: true,
      mensagem: "Pagamento aprovado com sucesso!",
      codigoTransacao: Math.random().toString(36).substring(2, 10).toUpperCase(),
      dataConfirmacao: new Date().toISOString(),
    });
  }, 1500);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
