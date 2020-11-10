const express = require('express');
const mongoose = require('mongoose');
const Note = require('../model/note.js');
const User = require('../model/user.js');

var router = express.Router();

// get all notes or create one note
const GetNotes = function(req, res) {
	const { owner } = req.headers;
	if(owner) {
		User.findOne({ _id: owner }, function(err, user) {
			if(user) {
				Note.find({ owner: owner }, function(err, notes) {
					res.status(200).send(notes)
				})
			}	else {res.status(401).send("You need a correct _id to sign-in to view notes")}
		})
	}	else {res.status(403).send("Send a valid owner _id in headers to get notes")}
};

const CreateNote = function(req, res) {
	const { owner } = req.headers;
	if(owner) {
		User.findOne({ _id: owner }, function(err, user) {
			if(user) {
				var note = new Note({
					owner: owner,
					title: req.body.title,	
					body: req.body.body
				})
				note.save(function(err) {
					if(!err) {
						console.log("Success!");
						res.status(201).send(`Note with title: ${req.body.title}, Added Successfully`);
					}
				});
			} else {res.status(401).send("You need a correct _id to sign-in to view notes")}
		})
	}	else {res.status(403).send("Send a valid owner _id in headers to create notes")}
};

// RUD one note
const ReadOneNote = function(req, res) {
	const { owner } = req.headers;
	if(owner) {
		User.findOne({ _id: owner }, function(err, user) {
			if(user) {
				Note.find({ owner: owner, _id: req.params.noteId }, function(err, note) {
					if(note) {res.status(200).send(note)}
					// if(!note){res.status(404).send("The note you're looking for might have been deleted or does not exist")}
					else {res.status(404).send(`No notes from ${user.username} found`)}
				})
			}	else {res.status(401).send("You need correct _id(s) to view note")}
		})
	} else {res.status(403).send("Send a valid owner _id in headers to get notes")}
};

const UpdateOneNote = function(req, res) {
	const { owner } = req.headers;
	if(owner) {
		User.findOne({ _id: owner }, function(err, user) {
			if(user) {
				Note.findById(req.params.noteId, { owner: owner }, function(err, note) {
					if(note) {
						const { title, body } = req.body;
						if(title && body) { 
							note.title = title;
							note.body = body;
							note.save(function(err) {
								if(!err) {
									res.status(200).send(note);
								}
							})
						}	else {res.status(403).send(
							"Update must be title and body; :( sorry, rewrite the title or body or whichever you want to be left out"
						)}
					}	else {res.status(404).send(`No notes from ${user.username} found`)}
				})
			}	else {res.status(401).send("You need correct _id(s) to view note")}
		})
	}	else {res.status(403).send("Send a valid owner _id in headers to edit notes")}
};

const DeleteOneNote = function(req, res) {
	const { owner } = req.headers;
	if(owner) {
		User.findOne({ _id: owner }, function(err, user) {
			if(user) {
				Note.findByIdAndDelete({ _id: req.params.noteId, owner: owner }, function(err, note) {
					if(note) {
						res.status(200).send(`${note.title} deleted successfully`)
					}	else {res.status(404).send(`No note from ${user.username} found`)}
				})
			} else {res.status(401).send("You need correct _id(s) to delete note")}
		})
	} else {res.status(403).send("Send a valid owner _id in headers to delete notes")}
};


router.route('/notes')
.get(GetNotes)
.post(CreateNote);

router.route('/notes/:noteId')
.get(ReadOneNote)
.put(UpdateOneNote)
.delete(DeleteOneNote);


module.exports =  router