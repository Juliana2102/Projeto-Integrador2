const express = require("express");
const db = require("./db");
const upload = require("./multerConfig");
const routes = require("./routes");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/cadastro", upload.single("produtoImagem"), (req, res) => {
  // Acessar os dados do formulário usando req.body
  const nome = req.body.produtoNome;
  const descricao = req.body.produtoDescricao;
  const preco = req.body.produtoPreco;

  // O arquivo da imagem está disponível em req.file
  const imagem = req.file;

  // Execute a lógica de tratamento do formulário aqui
  // Use o banco de dados (db) para inserir os dados, se necessário
  db.query(
    "INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)",
    [nome, descricao, preco, imagem.filename],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir dados no banco de dados:", err);
        // Tratar o erro e enviar uma resposta apropriada
        res.status(500).send("Erro ao processar o formulário.");
      } else {
        // Envie uma resposta de sucesso
        res.send("Cadastro realizado com sucesso!");
      }
    }
  );
});

module.exports = app;