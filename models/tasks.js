var Sequelize = require("sequelize");
var sequelize = require("../config/db");

var Task = sequelize.define('Task', {
  text: Sequelize.STRING
});

// Task.sync({force: true});

module.exports = Task;