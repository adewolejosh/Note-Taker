const express = require('express');
const mongoose = require('mongoose');
const { GetUser, CreateUser, UpdateUser, DeleteUser } = require('../view/user.js');

var router = express.Router();

router.route('/user')
.get(GetUser)
.post(CreateUser)
.put(UpdateUser)
.delete(DeleteUser);


module.exports =  router