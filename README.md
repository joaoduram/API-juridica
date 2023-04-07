# API-juridica

#PARA EXECUTAR O NODE.JS
- express usado para criar o servidor web
- cors permite que outrar aplicações façam requisições
- body-parser para leitura de json
- mysql2 para conectar com o banco de dados mysql

Rota POST /: utilizada para adicionar um novo artigo no banco de dados. Os dados do artigo são enviados no corpo da requisição em formato JSON, com os campos title, author, content, date e category
Rota GET /articles: utilizada para listar todos os artigos do banco de dados em ordem de data decrescente.
Rota GET /articles/filterByCategory/:filter utilizada para filtrar os artigos por categoria. O parâmetro :filter é a categoria a ser filtrada 
Rota GET /articles/searchByTerm/:term utilizada para buscar artigos pelo título ou pelo conteúdo. O parâmetro :term é o termo de busca

Executar o programa com node index.js
A mensagem "Servidor rodando na porta 3000" ira aparecer 

#PARA EXECUTAR O PYTHON

list_all->LISTA TODOS OS ARTIGOS POR ORDEM DE PUBLICAÇÃO
filter_category->FILTRAR POR CATEGORIA E RECEBE CATEGORY
search_term->BUSCAR POR TERMO CHAVE NO TITULO OU CATEGORIA E RECEBE TERM
getAllByCategory->QTD POR DE ARTIGOS POR CATEGORIA E MEDIA DE PALAVRAS, PASSA TUDO PARA UM CSV
getByAuthor->QTD POR DE ARTIGOS POR NOME DE AUTOR E MEDIA DE PALAVRAS, PASSA TUDO PARA UM CSV

Indicar as funções que deseja executar na função main 
executar com python main.py

Criar um banco de dados no MYSQL e utilizar a seguinte query para criar a tabela
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  date DATETIME DEFAULT '2023-04-05 12:00:00',
  category VARCHAR(255) NOT NULL
);
Um mode pratico de popular o banco de dados é utilizar o postman com a rota http://localhost:3000/articles 
[
    {
        "author": "João Silva",
        "title": "A Responsabilidade Civil por Danos Ambientais",
        "content": "A responsabilidade civil por danos ambientais é uma importante ...",
        "date": "2022-10-15 17:30:00",
        "category": "Civil"
    },
    {
        "author": "Maria Oliveira",
        "title": "STJ decide que plano de saúde",
        "content": "O Superior Tribunal de Justiça (STJ) decidiu que os planos de saúde ...",
        "date": "2021-08-10 17:30:00",
        "category": "Saúde"
    },
    {
        "author": "Pedro Souza",
        "title": "Supremo Tribunal Federal define que ICMS ...",
        "content": "O Supremo Tribunal Federal (STF) decidiu ...",
        "date": "2017-03-15 11:00:00",
        "category": "Direito Tributário"
    },
    {
        "author": "João Silva",
        "title": "Novo Código Florestal entra em vigor",
        "content": "O novo Código Florestal ...",
        "date": "2013-05-28 13:00:00",
        "category": "Meio Ambiente"
    },
    {
        "author": "Fernando Henrique Cardoso",
        "title": "Código Civil",
        "content": "Lei de Introdução ...",
        "date": "2002-01-10 19:00:00",
        "category": "Civil"
    }
]
