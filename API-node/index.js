/*
- express usado para criar o servidor web
- cors permite que outrar aplicações façam requisições
- body-parser para leitura de json
- mysql2 para conectar com o banco de dados mysql
*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Cria a conexão com o banco de dados 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database name'
});

//Conecta com o banco 
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

//Rota POST /: utilizada para adicionar um novo artigo no banco de dados. Os dados do artigo são enviados no corpo da requisição em formato JSON, com os campos title, author, content, date e category
app.post('/articles', (req, res) => {
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

//Rota GET /articles: utilizada para listar todos os artigos do banco de dados em ordem de data decrescente.
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

//Rota GET /articles/filterByCategory/:filter utilizada para filtrar os artigos por categoria. O parâmetro :filter é a categoria a ser filtrada 
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

//Rota GET /articles/searchByTerm/:term utilizada para buscar artigos pelo título ou pelo conteúdo. O parâmetro :term é o termo de busca
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

//API configurada para ouvir requisições na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
