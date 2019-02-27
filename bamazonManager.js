// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product

// If a manager selects View Products for Sale, the app should list every available item: 
// the item IDs, names, prices, and quantities. If a manager selects View Low Inventory, then
// it should list all items with an inventory count lower than five. If a manager selects Add 
// to Inventory, your app should display a prompt that will let the manager "add more" of any 
// item currently in the store. If a manager selects Add New Product, it should allow the 
// manager to add a completely new product to the store.

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


//////////////////////////////////////////////////

function promptInput() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'option',
            message: 'Please choose one of the following: \n' +
            "1. View Products for Sale. \n" + 
            "2. View Low Inventory. \n" + 
            "3. Add to Inventory. \n" + 
            "4. Add New Product.\n"
            // validate: validateInput
            // filter: Number
        }
    ]).then(function(input) {
        
        connection.connect(function(err) {  
            if (err) throw err;
            
            switch(input.option) {
                case "1":
                    viewProductsForSale();
                    break;
                case "2":
                    viewLowInventory();
                    break;
                case "3": 
                    addMoreOf();
                    break;
                case "4":
                    addNewProduct();
                    break;
                default: 
                    console.log("Please enter valid input.");
                    promptInput();
                    break;   
            }
        });
    });
}
function addMoreOf() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the new product\'s ID.'
        },
        {
            type: 'input',
            name: 'addedQuantity',
            message: 'Please enter the quantity to be added.'
        }
    ]).then(function(input) {
        var item_id = input.item_id;
        var addedQuantity = input.addedQuantity;
        var sqlQuery = "SELECT * FROM products WHERE ?";
        connection.query(sqlQuery, {item_id: item_id}, function(err, result) {
            if (err) {
                throw err;
            } else {
                var data = result[0];
                var stock_quantity = data.stock_quantity;
            }
            var newQuantity = parseInt(stock_quantity) + parseInt(addedQuantity);
            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + newQuantity + ' WHERE item_id = ' + item_id;

            // Update the inventory
            connection.query(updateQueryStr, function(err, data) {
                if (err) throw err;

                console.log('Your total new quanitity is ' + newQuantity + " units.");
                connection.end();
            });
        });
    });
}
function addNewProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newProductName',
            message: 'Please enter the new product\'s name.'
        },
        {
            type: 'input',
            name: 'newProductDepartment',
            message: 'Please enter the new product\'s department.'
        },
        {
            type: 'input',
            name: 'newProductPrice',
            message: 'Please enter the new product\'s price.'
        },
        {
            type: 'input',
            name: 'newProductQuantity',
            message: 'Please enter the new product\'s quantity.'
        }
    ]).then(function(input) {

        var sqlQuery = "INSERT INTO products (product_name, department_name, price, stock_quantity) " + 
                        "VALUES  ('" + input.newProductName + "', '" + input.newProductDepartment + "', " + input.newProductPrice + ", " + input.newProductQuantity+ ");"

        // console.log(sqlQuery);
        connection.query(sqlQuery, function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log("Inventory successfully updated.")
            }
        });
    });
}
function viewLowInventory() {
    var sqlQuery = "SELECT * FROM products WHERE stock_quantity < 5"

    connection.query(sqlQuery, function(err, result) {
        if (err) {
            throw err;
        } else {
    
        }
        result.forEach(function(e) {
            console.log(
                "Product ID: " + e.item_id, 
                "\nProdcut Name: " + e.product_name, 
                "\nDepartment Name: " + e.department_name,
                "\nPrice: " + e.price,
                "\nStock Quantity: " + e.stock_quantity,
                "\n"
            );
        });
    });
}
function viewProductsForSale() {
    var sqlQuery = "SELECT * FROM products"

    connection.query(sqlQuery, function(err, result) {
        if (err) {
            throw err;
        } else {
    
        }
        result.forEach(function(e) {
            console.log(
                "Product ID: " + e.item_id, 
                "\nProdcut Name: " + e.product_name, 
                "\nDepartment Name: " + e.department_name,
                "\nPrice: " + e.price,
                "\nStock Quantity: " + e.stock_quantity,
                "\n"
            );
        });
    });
}

