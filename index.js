const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;

//======================================================================================================
//these variables will change based on what username the user inputs. We pull this info from Github.
//======================================================================================================
let profileImg;
let githubUsername;
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
    .then(function (userInput) {

        var githubUsername = userInput.username.split(' ').join('') + ".json";

        fs.writeFile(githubUsername, JSON.stringify(userInput, null, '\t'), function (err) {

            if (err) {
                //===========================
                //logs an error if incorrect
                //===========================
                return console.log(err);
            }

            // console.log("File Saved!");
            //============================================================================
            //if correct, we will do an axios request to find information on this user.
            //The queryUrl must include the correct Github username.
            //============================================================================
            const queryUrl = "https://api.github.com/users/" + userInput.username;
            // console.log(queryUrl);
            //====================================================================
            //this is the function that performs the axios request.
            //====================================================================
            githubQuery(queryUrl);
        });
    });

//====================================================
// Make a request for a user with a given Github ID
//====================================================
function githubQuery(queryUrl) {

    axios.get(queryUrl)
        .then(function (response) {
            // handle success
            // console.log(response);
            console.log(response.data.name);
            // console.log(response.data.public_repos);

            let profileImg = response.data.avatar_url;
            console.log(profileImg);

            let githubUsername = response.data.login;
            console.log("Username: " + githubUsername);

            let userCity = response.data.location;
            console.log("Lives in: " + userCity);

            let userGithubProfileURL = response.data.html_url;
            console.log("Github URL: " + userGithubProfileURL);

            let userBlogURL = response.data.blog;
            console.log("Blog: " + userBlogURL);

            let userBio = response.data.bio;
            console.log(userBio);

            let numberOfRepos = response.data.public_repos;
            console.log("Number of Public Repos: " + numberOfRepos);

            let numberofFollowers = response.data.followers;
            console.log("Number of Followers: " + numberofFollowers);

            let numberofGitStars = response.data.starred_url.length;
            console.log("Number of Starred Projects: " + numberofGitStars);

            let numberofUsersFollowing = response.data.following
            console.log("Number of Users Following: " + numberofUsersFollowing);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        })
}
