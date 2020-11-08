const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const Note = require('../model/note.js');

var router = express.Router();

// get or create New Users
router.route('/users')
.get(function(req, res) {
	const { username, email } = req.body;
	if (username && email){
		User.find({ username: username, email: email}, function(err, user){
			if(user){res.status(200).json(user)}
			// if(!user){res.status(404).send("Sign-in details were not correct!")}
			else{res.status(404).send("Sign-in to get your id")}
		})
	}
	else{res.status(401).send("Username and email required")}
})
.post(function(req, res){
	User.findOne({username: req.body.username, email: req.body.email}, function(err, user){
		if(user){
			res.send(`User with that Email and Username already exists`)
		}
		else{
			const { username, email } = req.body;
			var user = User.create({username: username, email: email}, function(err){
		  	if (!err){
		  		// res.status(201).send("Successfully added user: " + username);
		  		res.status(201).send(`Successfully added user ${username}`);
		  		console.log('Success!');
		  	}
			})
		}
	})
})
.put(function(req, res){
	const { owner } = req.headers;
	if(owner){
		User.findOne({ _id: owner }, function(err, user){
			if(user){
				const { username, email } = req.body;
				if(username && email){
					user.username = username;
					user.email = email;
					user.save(function(err){
						if(!err){
							res.status(200).send(user);
						}
					})
				}
				else{res.status(403).send(
					"Update must include email and username"
				)}
			}
			else{res.status(401).send("You need correct Sign-in details")}
		})
	}
	else{res.status(403).send("Send a valid owner _id in headers to edit user")}
})
.delete(function(req, res){
	const { owner } = req.headers;
	if(owner){
		User.deleteOne({ _id: owner }, function(err, user){
			if(user){
				const { username, email } = req.body;
				if(username && email){
					Note.deleteMany({ owner: owner}, function(err, notes){
						if(user && notes){
							res.status(200).send(`User and their notes have been deleted`);
						}
					})
				}
			}
		})
	}
	else{res.status(403).send("Send a valid owner _id in headers to delete user")}
})

module.exports =  router