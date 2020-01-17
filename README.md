# Developer Profile Generator

This is my developer profile generator. It is a command-line application that dynamically generates an HTML and PDF profile from a GitHub username. The application will be invoked with the following command:

```sh
node index.js
```

This requires some node packages, be sure to use npm install after downloading this generator.

# Instructions

How To Use The App:
1. Clone the repo from https://github.com/cml2377/dev-profile-generator
2. Install the modules with: npm install
3. Open index.js in Terminal, then input: node index.js
4. Enter a GitHub profile name and favorite color 
5. Your profile will generate an HTML and PDF

## Demo

![Demonstration of Developer Profile Generator as a gif](https://github.com/cml2377/dev-profile-generator/blob/master/assets/images/demonstration.gif)

## Description

The user will be prompted for a favorite color, which will be used as the background color for cards.

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

## Business Context

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

## Minimum Requirements

* Functional, deployed application.

* GitHub repository with a unique name and a README describing project.

* The application generates a PDF resume from the user provided GitHub profile.

* The generated resume includes a bio image from the user's GitHub profile.

* The generated resume includes the user's location and a link to their GitHub profile.

* The generated resume includes the number of: public repositories, followers, GitHub stars and following count.

* The background color of the generated PDF matches the color that the user provides.