// Will handle connection logic to mongoDB databse

const mongoose = require('mongoose');

// Use gloval JS promise
mongoose.Promise = global.Promise;

// Start mongoDB 
// Localhost:27017 is default mongodb server
mongoose.connect('mongodb://localhost:27017/TaskManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err)
});


// To prevent prepecation warnings (from mongodb native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = {
  mongoose
};
