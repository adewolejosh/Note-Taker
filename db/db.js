const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/NotesDB';
var c_s = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

module.exports = {
 url, c_s
}
