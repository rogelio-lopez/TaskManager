// Combines all of the models
// Easier to import from other files

const { Project } = require('./project.model');
const { Task } = require('./task.model');

module.exports = {
  Project,
  Task
}
