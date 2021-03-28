const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //wite space at both ends is trimmed off
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };
