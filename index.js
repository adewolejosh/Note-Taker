const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');
const express = require('express');
const {url, c_s} = require('./db/db.js');
const index_router = require('./router/index_router.js');
const user_router = require('./router/user_router.js');
const note_router = require('./router/note_router.js');


var app = express();


mongoose.connect(url, c_s)
.then(function(db) {
	if(db){console.log("Connected")};
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(cors());

app.use('/', user_router);
app.use('/', note_router);
app.use('/', index_router);

app.listen(3000, function(){});