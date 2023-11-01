const app = require('./routes');

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});