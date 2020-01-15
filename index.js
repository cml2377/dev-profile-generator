const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const electronPDF = require('electron-pdf');

//======================================================================================================
// These variables will change based on what username the user inputs. We pull this info from Github.
//======================================================================================================
let profileImg;
let githubUsername;
let userCity;
let userGithubProfileURL;
let userBlogURL;
let userBio;
let numberOfRepos;
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
                // logs an error if incorrect
                //===========================
                return console.log(err);
            }

            // console.log("File Saved!");
            //============================================================================
            // If correct, we will do an axios request to find information on this user.
            // The queryUrl must include the correct Github username.
            //============================================================================
            const queryUrl = "https://api.github.com/users/" + userInput.username;
            const queryStarUrl = "https://api.github.com/users/" + userInput.username + "/starred";
            // console.log(queryUrl);
            console.log(queryStarUrl);
            //====================================================================
            // This is the function that performs the axios request.
            //====================================================================
            githubQuery(queryUrl);
            githubQueryStars(queryStarUrl);
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

            let profileImg = response.data.avatar_url + ".png";
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

            // THIS DOESN'T WORK-- Must do a second Axios call to grab number of starred repos. See below!
            // let numberofGitStars = response.data.starred_url.length;
            // console.log("Number of Starred Projects: " + numberofGitStars);    59?! I have not starred that much, yet.

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

//============================================================
// This function finds number of starred repos a user has.
//============================================================
function githubQueryStars(queryStarUrl) {

    axios.get(queryStarUrl)
        .then(function (responseStars) {
            // handle success
            console.log("Number of Starred Repos: " + responseStars.data.length);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

//===================================================================
// Next, we must put this information into an HTML and THEN a pdf.
// I use electron-pdf node module.
//===================================================================

//=================================================
// First, a function that creates an HTML file.
//=================================================

// function generateHTML(data);


//======================================================
// Then, a function that converts the HTML into a pdf.
//========== COMMAND LINE USAGE OF ELECTRON ===================================
// EXAMPLE FROM HTML FILE: electron-pdf index.html ~/Desktop/index.pdf
// EXAMPLE FROM URL: electron-pdf https://fraserxu.me ~/Desktop/fraserxu.pdf
//=============================================================================