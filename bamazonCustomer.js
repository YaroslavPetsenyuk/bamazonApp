var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts();
});

function showProducts() {
    console.log("Here is what we have in the store...\n");
    connection.query("SELECT * FROM bamazon", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].item_id + " | " +
                res[i].product_name + " | " +
                res[i].department_name + " | " +
                res[i].price + " | " +
                res[i].stock_quantity
            )
        }
        console.log("-----------------------------------------------------")

    });

    userPrompt();

    connection.end();
};

function userPrompt() {
    inquirer.prompt([
        {
            name: "id_number",
            type: "input",
            message: "Please enter the ID number of the item that you would like to purchase :"
        },
        {
            name: "amount",
            type: "input",
            message: "How many items would you like to purchase?"
        }
    ]).then(function (user_entry) {
        var entered_id = user_entry.id_number;
        var entered_quantity = user_entry.amount;

        userOrder(entered_id, entered_quantity);
    })
}