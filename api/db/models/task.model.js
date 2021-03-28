const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //wite space at both ends is trimmed off
  },
  _projectId: {
    type: mongoose.Types.ObjectId, //so we know which this task belongs to
    required: true
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };
