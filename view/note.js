const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Note = require('../model/note.js');
const User = require('../model/user.js');


// get all notes or create one note
const GetNotes = function(req, res) {
 const { owner } = req.headers;
 if(owner) {
  User.findOne({ _id: owner }, function(err, user) {
   if(user) {
    Note.find({ owner: owner }, function(err, notes) {
     res.status(200).send(notes)
    })
   } else {res.status(401).send("You need a correct _id to sign-in to view notes")}
  })
 } else {res.status(403).send("Send a valid owner _id in headers to get notes")}
};

const CreateNote = function(req, res) {
 const { owner } = req.headers;
 if(owner) {
  User.findOne({ _id: owner }, function(err, user) {
   if(user) {
    const { title, body } = req.body;
    if(title.length > 0 && title.length < 300){
      // re = /^ (\w\s\d)+ | \s+ | \d+ | \w+ $/
      // if(re.test(title) = true){}
      if(body.length >= 0 && title.length < 10000){
        var note = new Note({
         owner: owner,
         title: title, 
         body: body
        })
        note.save(function(err) {
         if(!err) {
          console.log("Success!");
          res.status(201).send(`Note with title: ${title}, Added Successfully`);
         }
        });
      } else {
        res.status(403).send("Please send a note with less than 10000 characters!")
      }
    } else {
      res.status(403).send("Please your title must not be empty and not too long!")
    }
   } else {res.status(401).send("You need a correct _id to sign-in to view notes")}
  })
 } else {res.status(403).send("Send a valid owner _id in headers to create notes")}
};


// RUD one note
const ReadOneNote = function(req, res) {
 const { owner } = req.headers;
 if(owner) {
  User.findOne({ _id: owner }, function(err, user) {
   if(user) {
    Note.findOne({ owner: owner, _id: req.params.noteId }, function(err, note) {
     if(note) {res.status(200).send(note)}
     // if(!note){res.status(404).send("The note you're looking for might have been deleted or does not exist")}
     else {res.status(404).send(`No notes from ${user.username} found`)}
    })
   } else {res.status(401).send("You need correct _id(s) to view note")}
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
      } else {res.status(403).send(
       "Update must be title and body; :( sorry, rewrite the title or body or whichever you want to be left out"
      )}
     } else {res.status(404).send(`No notes from ${user.username} found`)}
    })
   } else {res.status(401).send("You need correct _id(s) to view note")}
  })
 } else {res.status(403).send("Send a valid owner _id in headers to edit notes")}
};

const DeleteOneNote = function(req, res) {
 const { owner } = req.headers;
 if(owner) {
  User.findOne({ _id: owner }, function(err, user) {
   if(user) {
    Note.findByIdAndDelete({ _id: req.params.noteId, owner: owner }, function(err, note) {
     if(note) {
      res.status(200).send(`${note.title} deleted successfully`)
     } else {res.status(404).send(`There is no such note from ${user.username} found`)}
    })
   } else {res.status(401).send("You need correct _id(s) to delete note")}
  })
 } else {res.status(403).send("Send a valid owner _id in headers to delete notes")}
};


// Note Converter
const NoteToConverter = function(req, res) {
  const { owner } = req.headers;
  if(owner) {
    User.findOne({ _id: owner }, function(err, user) {
    if(user) {
      const { type, noteId } = req.body; // Please for now make sure the "type" is in [doc or pdf**]
      Note.findOne({ owner: owner, _id: noteId }, function(err, note) {
        if(note) {
          fs.writeFile(`tempStorage/${ note.title }.${ type }`, `${ note.body }`, function(err, file) {
            if(err) {throw error}
            else {
              res.type(`${ type }`).download(`tempStorage/${ note.title }.${ type }`, function(err) {
                if(err) {
                  throw err;
                } else {
                  fs.unlink(`tempStorage/${ note.title }.${ type }`, function(err) {
                    if(err) { 
                      throw err 
                    } else {
                      console.log('I think I have deleted it!');
                    }
                  });
                }
              }) 
              console.log(`sent ${ note.title }.${ type } to owner: ${ user.email }`)
            }
          })
        } else {res.status(404).send(`No notes from ${ user.username } found`)}
      })
    } else {res.status(401).send("You need correct _id(s) to view note")}
    })
  } else {res.status(403).send("Send a valid owner _id in headers to get notes")} 
};


module.exports =  {
  GetNotes, CreateNote, ReadOneNote, UpdateOneNote, DeleteOneNote, NoteToConverter
};