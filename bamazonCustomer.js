var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts();
});

function showProducts() {
    console.log("Here is what we have in the store...\n");
    connection.query("SELECT * FROM products", function (err, res) {
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

        userPrompt();
    });

};

function userPrompt() {
    inquirer.prompt([
        {
            name: "input_id",
            type: "input",
            message: "Please enter the ID number of the item that you would like to purchase :"
        },
        {
            name: "input_amount",
            type: "input",
            message: "How many items would you like to purchase?"
        }
    ]).then(function (userOrder) {
        connection.query("SELECT * FROM products WHERE item_id=?", userOrder.input_id, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (userOrder.input_amount > res[i].stock_quantity) {
                    console.log("Sorry, the stock of this item is less then what you have entered");
                }
                else {
                    console.log("These items are in stock and we are processing your order now.")
                    console.log("You have selected: " + userOrder.input_amount + " " + res[i].product_name);
                    console.log("Your total purchase price is: " + res[i].price * userOrder.input_amount);

                    var newItemStock = (res[i].stock_quantity - userOrder.input_amount);

                    var newPurchaseID = (userOrder.input_id);

                    updateDB(newItemStock, newPurchaseID);
                }
                function updateDB(newItemStock) {
                    connection.query("UPDATE products SET stock_quantity = " + newItemStock + " WHERE item_id = " + newPurchaseID);
                    console.log("Your order has been processed. Please look out for an email confirmation in your inmail box.");
                    console.log("Thank you for your order !");

                    seeStoreAgain();
                };

                function seeStoreAgain() {
                    inquirer.prompt([
                        {
                            type: "confirm",
                            name: "buyAnother",
                            message: "Would you like to go back to the Store?",
                            default: true
                        }
                    ]).then(function (confirmation) {
                        if (confirmation.buyAnother === true) {
                            showProducts();
                        };
                    });
                };
            };
        });
    });
};
