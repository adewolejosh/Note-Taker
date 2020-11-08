const express = require('express');

var router = express.Router();


// Welcome
router.route('')
.get(function(req, res){
	res.send(
		'Welcome, <br><a href="/users">CRUD User(s)</a><br><a href="/notes">CRUD Notes</a>'
	);
});

module.exports =  router