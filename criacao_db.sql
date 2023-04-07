CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  date DATETIME DEFAULT '2023-04-05 12:00:00',
  category VARCHAR(255) NOT NULL
);