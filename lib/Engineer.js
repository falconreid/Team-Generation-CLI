const Employee = require("./Employee.js");
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer extends Employee {
  constructor(GitHubUser) {
    this.GitHubUser = GitHubUser;
  }

  getGithub() {
    return this.GitHubUser;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
