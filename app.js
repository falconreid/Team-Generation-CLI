var validator = require("email-validator");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the manager's name.",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID.",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email.",
        validate: (answer) => {
          const emailCheck = answer.match(/\S+@\S+\.\S+/);
          if (emailCheck) {
            return true;
          }
          return "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's phone number.",
      },
    ])
    .then(function (answers) {
      const manager = new manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
    });
  teamPrompt();
}

function teamPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What type of employee would you like to add?",
        choices: ["Engineer", "Intern", "No More Employees"],
      },
    ])
    .then((answers) => {
      switch (answers.role) {
        case "Engineer":
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "What is the engineers's name?",
              },
              {
                type: "input",
                name: "id",
                message: "What is the engineers's ID?",
              },
              {
                type: "input",
                name: "email",
                message: "What is the engineers's email?",
                validate: (answer) => {
                  const emailCheck = answer.match(/\S+@\S+\.\S+/);
                  if (emailCheck) {
                    return true;
                  }
                  return "Please enter a valid email address.";
                },
              },
              {
                type: "input",
                name: "github",
                message: "What is the engineers's Github username?",
              },
            ])
            .then(function (answers) {
              const engineer = new engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
              );
            });
          break;
        case "Intern":
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "What is the intern's name?",
              },
              {
                type: "input",
                name: "id",
                message: "What is the intern's ID?",
              },
              {
                type: "input",
                name: "email",
                message: "What is the intern's email?",
                validate: (answer) => {
                  const emailCheck = answer.match(/\S+@\S+\.\S+/);
                  if (emailCheck) {
                    return true;
                  }
                  return "Please enter a valid email address.";
                },
              },
              {
                type: "input",
                name: "school",
                message: "What school is the intern attending?",
              },
            ])
            .then(function (answers) {
              const intern = new intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
              );
            });
          break;
        case "No More Employees":
          console.log("Employee profiles are done!");
      }
    });
}

createManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
