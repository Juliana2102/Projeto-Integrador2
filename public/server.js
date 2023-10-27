const app = require('./routes');
const express = require('express');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/cadastro', upload.single('produtoImagem'), (req, res) => {
  // Lógica para processar o formulário e inserir dados no banco de dados

  // Suponhamos que você tenha obtido a URL da imagem após o cadastro
  const urlDaImagem = `/uploads/${req.file.filename}`;

  // Aqui você pode gerar uma resposta HTML que inclui a imagem
  const respostaHtml = `
    <h2>Cadastro realizado com sucesso!</h2>
    <p>Seu produto foi cadastrado com sucesso.</p>
    <img src="${urlDaImagem}" alt="Imagem do Produto">
  `;

  // Envie a resposta HTML de volta ao navegador
  res.send(respostaHtml);
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
