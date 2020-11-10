const express = require('express');

var router = express.Router();


// Welcome
const Home = function(req, res) {
	res.send(
		'Welcome, <br><a href="/users">CRUD User(s)</a><br><a href="/notes">CRUD Notes</a>'
	);
}


router.route('')
.get(Home)


module.exports =  router