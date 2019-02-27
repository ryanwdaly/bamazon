var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: "3306",
    database: "Bamazon"
  });

  promptInput();

  function promptInput() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.'
            // validate: validateInput
            // filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units do you require?'
            // validate: validateInput,
            // filter: Number
        }
    ]).then(function(input) {
        var item_id = input.item_id;
        var quantity_requested = input.quantity;
        
        connection.connect(function(err) {  
            if (err) throw err;
            
            var sqlQuery = "SELECT * FROM products WHERE ?"
            connection.query(sqlQuery, {item_id: item_id}, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    var data = result[0];
                    var product_id = data.item_id;
                    var product_name = data.product_name;
                    var department_name = data.department_name;
                    var price = data.price;
                    var stock_quantity = data.stock_quantity;
                }
            
                if (stock_quantity < quantity_requested) {
                    console.log("Insufficient quantity. " + quantity_requested + " requested. " + result.stock_quantity + " available.");
                } else {
                    console.log('Order Complete.');

					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (stock_quantity - quantity_requested) + ' WHERE item_id = ' + item_id;

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your total is $' + price * quantity_requested);

						// End the database connection
						connection.end();
                    });
                }
            });
        });
    });
}