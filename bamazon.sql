CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(25) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Presser Cooker', 'Home and Kitchen', 69.99, 500),
        ('Wyze Cam', 'Electronics', 37.98, 150),
        ('Neoprene Dumbbells', 'Sports and Outdoors', 8.49, 225),
        ('Echo Dot', 'Electronics', 49.99, 300),
        ('Water Filter', 'Home and Kitchen', 6.58, 250),
        ('Sorel Slippers', 'Shoes', 46.99, 120),
        ('Alita', 'Books', 15.60, 430),
        ('Hanged Man', 'Books', 11.55, 275), 
        ('A Song of Ice and Fire', 'Books', 41.99, 100),
        ('Cesar Simply Crafted', 'Pet Supplies', 2.99, 50),
        ('Coffee', 'Groceries', 5.99, 185),
        ('Mac and Cheese', 'Groceries', 1.99, 135),
        ('Top Ramen', 'Groceries', 0.99, 600), 
        ('Fruit Loops', 'Groceries', 4.95, 300), 
        ('Kitchen Aid Blender', 'Home and Kitchen', 199.99, 50), 
        ('Lamp', 'Home and Kitchen', 35.99, 10);


