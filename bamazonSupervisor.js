// Create another Node app called bamazonSupervisor.js. Running this application will list a set 
// of menu options:

// View Product Sales by Department
// Create New Department

// When a supervisor selects View Product Sales by Department, the app should display a summarized 
// table in their terminal/bash window. Use the table below as a guide.

//department_id     department_name     over_head_costs     product_sales     total_profit
//01                Electronics         10000               20000             10000

// The total_profit column should be calculated on the fly using the difference between over_head_costs 
// and product_sales. total_profit should not be stored in any database. You should use a custom alias.
// If you can't get the table to display properly after a few hours, then feel free to go back and just 
// add total_profit to the departments table.

// Hint: You may need to look into aliases in MySQL.
// Hint: You may need to look into GROUP BYs.
// Hint: You may need to look into JOINS.
// HINT: There may be an NPM package that can log the table to the console. 
// What's is it? Good question :)


var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('easy-table')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: "3306",
    database: "Bamazon"
  });

  promptInput();
//////////////////////////////////////////////////////////////////////
  function promptInput() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'option',
            message: 'Please choose one of the following:\n' + 
            "1. View Product Sales by Department\n" +
            "2. Create New Database"
        }
    ]).then(function(input) {
        switch(input.option) {
            case "1":
                viewSalesByDepartment();
                break;
            case "2":
                createNewDepartment();
                break;
            default: 
                console.log("Please enter valid input.");
                promptInput();
                break;   
        }
    });
}
function viewSalesByDepartment() {

        var sqlQuery = "SELECT department_id, departments.department_name, over_head_costs, " + 
        "SUM(product_sales) AS product_sales, " +
        "SUM(product_sales) - over_head_costs AS total_profit " +
        "FROM departments INNER JOIN products " +
        "ON departments.department_name = products.department_name " + 
        "GROUP BY department_id;"
 
        connection.query(sqlQuery, function(err, result) {
            if (err) {
                throw err;
            } else {
             
            var table = new Table
             
            result.forEach(function(element) {
                table.cell('Department ID', element.department_id)
                table.cell("Deparment Name", element.department_name)
                table.cell("Overhead Costs", element.over_head_costs)
                table.cell("Product Sales", element.product_sales)
                table.cell("Total Profit", element.total_profit)
                table.newRow()
            })

            console.log(table.toString())
            connection.end()
            }
        });
}
function createNewDepartment() {
    inquirer.prompt([{
		name: 'department',
		message: 'Enter department name: '
	},{
		name: 'overhead',
		message: 'Enter overhead costs: '
	}]).then(function(input){
		//variable to hold the user inputs
		var department = input.department;
		var overhead = input.overhead;
		connection.query('INSERT INTO departments SET ?', {
			department_name: department,
			over_head_costs: overhead
		}, function(err, res){});
        connection.end();

    })
}