require('dotenv').config()
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    port: "3306",
    database: "Bamazon"
  });

  promptInput();

  // Takes user input and returns a promise. User is prompted to provide a product ID and 
  //    a desired quantity, the products table is updated if order can be fulfilled, otherwise
  //    a message is logged regarding the issue 
  function promptInput() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units do you require?'
        }
    ]).then(function(input) {
        var item_id = input.item_id;
        var quantity_requested = input.quantity;           
        var sqlQuery = "SELECT * FROM products WHERE ?"

        connection.query(sqlQuery, {item_id: item_id}, function(err, result) {
            if (err) {
                throw err;
            } else {
                var data = result[0];
                var price = data.price;
                var stock_quantity = data.stock_quantity;
            }
        
            if (stock_quantity < quantity_requested) {
                console.log("Insufficient quantity. " + quantity_requested + " requested. " + result.stock_quantity + " available.");
            } else {
                console.log('Order Complete.');
                var orderPrice = price * quantity_requested;
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (stock_quantity - quantity_requested) + "," +
                    ' product_sales = ' + orderPrice + ' WHERE item_id = ' + item_id;

                // Update the inventory
                connection.query(updateQueryStr, function(err, data) {
                    if (err) throw err;

                    console.log('Your total is $' + orderPrice);
                });
            }
            connection.end();
        });
    });
}