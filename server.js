const express = require("express");
const bodyParser = require('body-parser');
const db = require("./db");
const upload = require("./multerConfig");
const app = express(); 


app.use(bodyParser.urlencoded({ extended: true }));

app.post("/cadastroUsuario", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  res.redirect("/login");

  console.log("Nome:", nome);
  console.log("E-mail:", email);
  console.log("Senha:", senha);

 
  res.send("Cadastro de usuário realizado com sucesso!");
});

app.post("/cadastroProdutos", upload.single("produtoImagem"), (req, res) => {
  const nome = req.body.produtoNome;
  const descricao = req.body.produtoDescricao;
  const preco = req.body.produtoPreco;
  const imagem = req.file;
  res.redirect("/ofertas"); 


  db.query(
    "INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)",
    [nome, descricao, preco, imagem.filename],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir dados no banco de dados:", err);
        res.status(500).send("Erro ao processar o formulário.");
      } else {
        res.send("Cadastro realizado com sucesso!");
      }
    }
  );
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
