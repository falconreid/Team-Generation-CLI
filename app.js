const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function engineerQuestions() {
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
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.push(engineer);
    })
    .then(function newCall() {
      console.log("Would you like to add another Member?");
      teamPrompt();
    });
}

function internQuestions() {
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
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
    })
    .then(function newCall() {
      console.log("Would you like to add another Member?");
      teamPrompt();
    });
}

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
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      teamPrompt();
    });
}

function teamPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please Choose Which Type of Employee to Add.",
        choices: ["Engineer", "Intern", "No More Employees"],
      },
    ])
    .then((answers) => {
      switch (answers.role) {
        case "Engineer":
          engineerQuestions();
          break;
        case "Intern":
          internQuestions();
          break;
        case "No More Employees":
          console.log("Employee profiles are done!");
          console.log(JSON.stringify(teamMembers));
          fs.writeFile(outputPath, render(teamMembers), "utf-8", (err) => {
            if (err) throw err;
            console.log(err);
          });
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
