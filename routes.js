const express = require("express");
const db = require("./db");
const upload = require("./multerConfig");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/cadastro', (req, res) => {
  const { nome, senha, email } = req.body; // Supondo que os campos do formulário sejam 'nome', 'senha', 'email'

  db.query('INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)', [nome, senha, email], (err, results) => {
    if (err) {
      console.error("Erro ao inserir dados no banco de dados:", err);
      res.status(500).send("Erro ao processar o formulário de cadastro de usuários.");
    } else {
      res.send('Cadastro de usuário realizado com sucesso!');
    }
  });
});

app.post("/cadastroProdutos", upload.single("produtoImagem"), (req, res) => {
  // Acessar os dados do formulário usando req.body
  const nome = req.body.produtoNome;
  const descricao = req.body.produtoDescricao;
  const preco = req.body.produtoPreco;

  // O arquivo da imagem está disponível em req.file
  const imagem = req.file;

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
