const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'G@BI2001jgzd14',
  database: 'legal_articles'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

app.post(' ', (req, res) => {
  const { title, author, content, date, category } = req.body;
  connection.query('INSERT INTO articles (title, author, content, date, category) VALUES (?, ?, ?, ?, ?)', [title, author, content,date,category], (err, result) => {
    if (err) {
      console.error('Erro ao inserir o item', err);
      res.status(500).json({ error: 'Erro ao inserir o item' });
      return;
    }
    res.status(200).json({ message: 'Item inserido com sucesso' });
  });
});

app.get('/articles', (req, res) => {
  connection.query('SELECT * FROM articles ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Erro ao listar os itens', err);
      res.status(500).json({ error: 'Erro ao listar os itens' });
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/articles/filterByCategory/:filter', (req, res) => {
  const filtro = req.params.filter;
  connection.query(`SELECT * FROM articles WHERE category LIKE '%${filtro}%'`, (err, results) => {
    if (err) {
      console.error('Erro ao filtrar os itens', err);
      res.status(500).json({ error: 'Erro ao filtrar os itens' });
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/articles/searchByTerm/:term', (req, res) => {
  const termoChave = req.params.term;
  connection.query(`SELECT * FROM articles WHERE title LIKE '%${termoChave}%' or content LIKE '%${termoChave}%'`, (err, results) => {
    if (err) {
      console.error('Erro ao buscar o item', err);
      res.status(500).json({ error: 'Erro ao buscar o item' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Item não encontrado' });
      return;
    }
    res.status(200).json(results[0]);
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
