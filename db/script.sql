DROP DATABASE IF EXISTS teste_docker;
CREATE DATABASE IF NOT EXISTS teste_docker;
USE teste_docker;
CREATE TABLE IF NOT EXISTS products (
  id INT(11) AUTO_INCREMENT,
  name VARCHAR (255),
  price DECIMAL (10, 2),
  PRIMARY KEY (id)
);
INSERT INTO products (name, price)
VALUES
  ('Camisa', 30),
  ('Calça', 50);