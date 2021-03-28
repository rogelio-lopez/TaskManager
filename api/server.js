const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');

// Load Mongoose Models
const { Project, Task } = require('./db/models');


// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Load Middleware
// will pass request body of http request (for req.body.title in POST)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


/* ============== */
/* Project Routes */
/* ============== */

/**
 * GET /projects
 * Purpose: Get all projects
 */
app.get('/projects', (req, res) => {
  // want to return array of projects in database

  //we want all of the projects so condition is empty
  Project.find({}).then((projects) => {
    res.send(projects);
  })
});

/**
 * POST /projects
 * Purpose: Create a project
 */
app.post('/projects', (req, res) => {
  // want to create a new project
  // return new project doc to user which includes id
  // project info will be passed via JSON

  //uses body-parser
  let title = req.body.title;
  let newProject = new Project({
    title
  });

  // .save to save in mongodb
  newProject.save().then((projectDoc) => {
    // full project doc is returned
    res.send(projectDoc);
  });

});

/**
 * PATCH /projects/:id
 * Purpose: update project
 */
app.patch('/projects/:id', (req, res) => {
  // want to update specified project with new value specified in JSON of request
  Project.findOneAndUpdate({_id: req.params.id}, {
    // update project it finds with content of req.body provided by caller/user
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});

/**
 * DELETE /projects/:id
 * Purpose: delete a list
 */
app.delete('/projects/:id', (req, res) => {
  // want to delete specified list
  Project.findOneAndRemove({
    _id: req.params.id
  }).then((removedProjectDoc) => {
    res.send(removedProjectDoc);
  });
});


/*=============*/
/* Task Routes */
/*=============*/

/**
 * GET /projects/:projectId/tasks
 * Purpose: Get all tasks in specific project
 */
app.get('/projects/:projectId/tasks', (req, res) => {
  // wnat to return all tasks belonging to spicific project
  Task.find({
    _projectId: req.params.projectId
  }).then((tasks) => {
    res.send(tasks);
  });
});

/**
 * GET one (not needed in this projectm      )
 */
app.get('/projects/:projectId/tasks/:taskId', (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _projectId: req.params.projectId
  }).then((task) => {
    res.send(task);
  })
})

/**
 * POST /projects/:projectId/tasks
 * Purpose: Create a new task in specific project
 */
app.post('/projects/:projectId/tasks', (req, res) => {
  // wnat to create a new task in the list specified by project id
  let newTask = new Task({
    title: req.body.title,
    _projectId: req.params.projectId
  })

  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  })
});

/**
 * PATCH /projects/:projectId/tasks/:taskId
 * Purpose: update existing task
 */
app.patch('/projects/:projectId/tasks/:taskId', (req, res) => {
  // want to update an existing task (specified by taskID)

  Task.findOneAndUpdate({
    _id: req.params.taskId,
    _projectId: req.params.projectId
  },
  {
    $set: req.body
  })
  .then(() => {
    res.sendStatus(200);
  })
});

/**
 * DELETE /projects/:projectId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/projects/:projectId/tasks/:taskId', (req, res) => {

  // remove task in a specific project

  Task.findOneAndDelete({
    _id: req.params.taskId,
    _projectId: req.params.projectId
  }).then((removedTaskDoc) =>{
    res.send(removedTaskDoc)
  })
});


/*==============*/
/* Start Server */
/*==============*/

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
