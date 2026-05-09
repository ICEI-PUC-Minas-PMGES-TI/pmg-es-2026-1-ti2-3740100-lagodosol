const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota para processar o pagamento
app.post('/api/pagamentos', (req, res) => {
  const { reserva, metodoPagamento, parcelas, dadosFormulario } = req.body;

  // Validação de segurança no Back-end
  if (!metodoPagamento || !reserva) {
    return res.status(400).json({ 
      sucesso: false, 
      mensagem: "Dados incompletos para processar o pagamento." 
    });
  }

  if (metodoPagamento === 'cartao' || metodoPagamento === 'debito') {
    if (!dadosFormulario.numeroCartao || dadosFormulario.numeroCartao.replace(/\s/g, "").length < 16) {
      return res.status(400).json({ sucesso: false, mensagem: "Cartão inválido." });
    }
  }

  if (metodoPagamento === 'pix' && !dadosFormulario.cpfPix) {
    return res.status(400).json({ sucesso: false, mensagem: "CPF obrigatório para PIX." });
  }

  // Simulação de processamento 
  console.log("Processando pagamento...");
  console.log("Quarto:", reserva.quarto);
  console.log("Método:", metodoPagamento);
  
  // Simula um tempo de resposta de 1.5 segundos da operadora
  setTimeout(() => {
    return res.status(200).json({
      sucesso: true,
      mensagem: "Pagamento aprovado com sucesso!",
      codigoTransacao: Math.random().toString(36).substring(2, 10).toUpperCase(),
      dataConfirmacao: new Date().toISOString()
    });
  }, 1500);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});