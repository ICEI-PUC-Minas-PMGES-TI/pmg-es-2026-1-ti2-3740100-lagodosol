const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let quartos = [];

app.get("/quartos", (req, res) => {
  res.json(quartos);
});

app.post("/quartos", (req, res) => {
  const { numero, tipo, capacidade, preco } = req.body;

  if (!numero || !tipo || !capacidade || !preco) {
    return res.status(400).json({
      erro: "Preencha todos os campos.",
    });
  }

  const novoQuarto = {
    id: Date.now(),
    numero,
    tipo,
    capacidade,
    preco,
  };

  quartos.push(novoQuarto);

  res.status(201).json({
    mensagem: "Quarto cadastrado com sucesso!",
    quarto: novoQuarto,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});