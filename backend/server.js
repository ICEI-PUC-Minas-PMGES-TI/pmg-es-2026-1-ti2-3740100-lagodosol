const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const ARQUIVO = "quartos.json";

// carregar quartos do arquivo
let quartos = [];

if (fs.existsSync(ARQUIVO)) {
  const dados = fs.readFileSync(ARQUIVO, "utf8");

  if (dados) {
    quartos = JSON.parse(dados);
  }
}

// listar quartos
app.get("/quartos", (req, res) => {
  res.json(quartos);
});

// cadastrar quarto
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

  // salva no arquivo
  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(quartos, null, 2)
  );

  res.status(201).json({
    mensagem: "Quarto cadastrado com sucesso!",
    quarto: novoQuarto,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});