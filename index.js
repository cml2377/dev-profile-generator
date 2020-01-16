function devProfileGen() {
    const inquirer = require("inquirer");
    const fs = require("fs");
    const axios = require('axios').default;
    const generateHTML = require('./generateHTML');
    const HTMLtoPDF = require('html-pdf');

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
                    "red",
                    "black"
                ]
            }
        ])
        .then(function (userInput) {
            // we create a json file with that information.
            var githubUsername = userInput.username.split(' ').join('') + ".json";

            fs.writeFile(githubUsername, JSON.stringify(userInput, null, '\t'), function (err) {

                if (err) {
                    //===========================
                    // logs an error if incorrect
                    //===========================
                    return console.log(err);
                }

                //============================================================================
                // If correct, we will do an axios request to find information on this user.
                // The queryUrl must include the correct Github username.
                //============================================================================
                const queryUrl = "https://api.github.com/users/" + userInput.username;
                const queryStarUrl = "https://api.github.com/users/" + userInput.username + "/starred";
                // console.log(queryUrl);
                // console.log(queryStarUrl);
                //====================================================================
                // These are the functions that perform the axios requests.
                //====================================================================
                githubQuery(queryUrl).then(function (response) {
                    githubQueryStars(queryStarUrl).then(function (responseStars) {
                        var options = { format: 'Letter' };
                        //=========================================================================================
                        // Next, we must put this information into an HTML and THEN a pdf.
                        // First, a function that creates an HTML file. This is pulled from the generateHTML.js.
                        // Then, HTMLtoPDF.create creates a pdf file from the HTML infomation generated.
                        //=========================================================================================
                        HTMLtoPDF.create(generateHTML(userInput, response, responseStars, profileImg, githubUsername, userCity, userGithubProfileURL, userBlogURL, userBio, numberOfRepos, numberofFollowers, numberofUsersFollowing), options).toFile(`./${userInput.username}.pdf`, function (err, res) {
                            if (err) return console.log(err);
                            console.log(res);
                        });;

                    })
                });

            });
        });

    //====================================================
    // Make a request for a user with a given Github ID
    //====================================================
    function githubQuery(queryUrl) {

        return axios.get(queryUrl)
            .then(function (response) {
                // handle success
                // console.log(response);
                // console.log(response.data.name);
                // console.log(response.data.public_repos);

                profileImg = response.data.avatar_url + ".png";
                // console.log(profileImg);

                githubUsername = response.data.login;
                // console.log("Username: " + githubUsername);

                userCity = response.data.location;
                // console.log("Lives in: " + userCity);

                userGithubProfileURL = response.data.html_url;
                // console.log("Github URL: " + userGithubProfileURL);

                userBlogURL = response.data.blog;
                // console.log("Blog: " + userBlogURL);

                userBio = response.data.bio;
                // console.log(userBio);

                numberOfRepos = response.data.public_repos;
                // console.log("Number of Public Repos: " + numberOfRepos);

                numberofFollowers = response.data.followers;
                // console.log("Number of Followers: " + numberofFollowers);

                // THIS DOESN'T WORK-- Must do a second Axios call to grab number of starred repos. See below!
                // const numberofGitStars = response.data.starred_url.length;
                // console.log("Number of Starred Projects: " + numberofGitStars);    59?! I have not starred that much, yet.

                numberofUsersFollowing = response.data.following
                // console.log("Number of Users Following: " + numberofUsersFollowing);
                return response;
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

        return axios.get(queryStarUrl)
            .then(function (responseStars) {
                // console.log("Number of Starred Repos: " + responseStars.data.length);
                return responseStars.data.length;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
}

devProfileGen();