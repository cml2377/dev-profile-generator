var inquirer = require("inquirer");
var fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Github username you would like a profile generated for?"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            name: "colors",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ])
    .then(function writeToFile(filename, data) {

        var filename = response.name.toLowerCase().split(' ').join('') + ".pdf";

        fs.writeFile(filename, JSON.stringify(data, null, '\t'), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");

        });
    });
