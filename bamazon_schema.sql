DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(150) NOT NULL,
  department_name VARCHAR(100),
  price DEC(10,4) NOT NULL,
  stock_quantity INT(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("iPhone XS", "Mobile Phones", 1299.99, 12), 
("Samsung Galaxy S10 Plus", "Mobile Phones", 998.98, 26), 
("LG 24 Monitor", "Monitors", 345.99, 8),
("Sammsung 22 Screen", "Monitors", 218.99, 3),
("Vizio 65 TV", "TV's", 890.00, 14),
("Samsung 75 TV", "TV's", 1099.99, 70),
("Golf Equipment", "Sporting", 278.85, 70),
("iPhone Covers", "Accesories", 19.95, 58),
("Motorolla Screen Protectors", "Accesories", 112.68, 20),
("Cracking the Coding Interview", "Books", 19.99, 28)



