const inquirer = require("inquirer");
const fs = require("fs");

//======================================================================================================
//these variables will change based on what username the user inputs. We pull this info from Github.
//======================================================================================================
let profileImg;
let githubusername;
let userCity;
let userGithubProfileURL;
let userBlogURL;
let userBio;
let numberOfRepos
let numberofFollowers;
let numberofGitStars;
let numberofUsersFollowing;

//======================================================================
// Inquirer prompts the user for Github username and favorite color.
//======================================================================
inquirer
    .prompt([
        {
            type: "input",
            name: "username",
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
    .then(function (response) {

        var githubUsername = response.username.split(' ').join('') + ".json";

        fs.writeFile(githubUsername, JSON.stringify(response, null, '\t'), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");
            const queryUrl = 'https://api.github.com/users/${username}';
            console.log(queryUrl);

        });
    });
