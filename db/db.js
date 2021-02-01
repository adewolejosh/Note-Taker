const mongoose = require('mongoose');

var local_url = 'localhost:27017/NotesDB';

var url = `mongodb://${local_url}`;
var c_s = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

module.exports = {
 url, c_s
}
