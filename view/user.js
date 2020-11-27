const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const Note = require('../model/note.js');


// CRUD User
const GetUser = function(req, res) {
 const { username, email } = req.body;
 if(username && email) {
  User.find({ username: username, email: email}, function(err, user) {
   if(user) {res.status(200).json(user)}
   // if(!user){res.status(404).send("Sign-in details were not correct!")}
   else {res.status(404).send("Sign-in to get your id")}
  })
 } else {res.status(401).send("Username and email required")}
};

const CreateUser = function(req, res) {
  const { username, email } = req.body;
  if(username && email) {
    if(username.length > 1 && username.length < 100) {
      if(email.length > 10 && email.length < 254) {
        User.findOne({ email: email }, function(err, userEmail) {
          if(userEmail) {
            res.status(403).send(`User with that email already exists`)
          } else {
            User.findOne({ username: username }, function(err, userName) {
              if(userName) {
                res.status(403).send(`User with that username already exists`)
              } else {
                var user = User.create({username: username, email: email}, function(err) {
                  if (!err) {
                    // res.status(201).send("Successfully added user: " + username);
                    res.status(201).send(`Successfully added user ${username}`);
                    console.log('Success!');
                  }
                })
              }
            })
          }
        })
      } else {
        res.status(403).send("Please send a valid email!");
      }
    } else {
      res.status(403).send("Please send a valid username!");
    }
  } else {
    res.status(403).send("Please sign-up with a username and email!");
  }
};

const UpdateUser = function(req, res) {
 const { owner } = req.headers;
 if(owner) {
  User.findOne({ _id: owner }, function(err, user) {
   if(user) {
    const { username, email } = req.body;
    if(username && email) {
      if(username.length > 1 && username.length < 100) {
        if (email.length > 10 && email.length < 254) {
          User.findOne({ email: email }, function(err, userName) {
            if(userName) {
              res.status(403).send("User with that username is already taken!")
            } else {
              User.findOne({ username: username }, function(err, userEmail) {
                if(userEmail) {
                  res.status(403).send("User with such email already exists!")
                } else {
                  user.username = username;
                  user.email = email;
                  user.save(function(err) {
                  if(!err) {
                   res.status(200).send(user);
                  }
                 })
                }
              })
            }
          })
        } else {
          res.status(403).send("Please send in a email of reasonable length")
        }
      } else {
        res.status(403).send("Please send a username of reasonable length")
      } 
    } else {res.status(403).send(
     "Update must include email and username"
    )}
   } else {res.status(401).send("You need correct Sign-in details")}
  })
 } else {res.status(403).send("Send a valid owner _id in headers to edit user")}
};

const DeleteUser = function(req, res) {
 const { owner } = req.headers;
 if(owner) {
  User.deleteOne({ _id: owner }, function(err, user) {
   if(user) {
    const { username, email } = req.body;
    if(username && email) {
     Note.deleteMany({ owner: owner}, function(err, notes) {
      if(user && notes) {
       res.status(200).send(`User and their notes have been deleted`);
      }
     })
    }
   }
  })
 } else {res.status(403).send("Send a valid owner _id in headers to delete user")}
};


module.exports =  {
  GetUser, CreateUser, UpdateUser, DeleteUser
};