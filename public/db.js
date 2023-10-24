const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: '302627',
  database: 'vitrine_vizinha_db', // Nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida.');
});

module.exports = db;
