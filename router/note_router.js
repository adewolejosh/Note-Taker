const express = require('express');
const mongoose = require('mongoose');
const { GetNotes, CreateNote, ReadOneNote, UpdateOneNote, DeleteOneNote, NoteToConverter } = require('../view/note.js');

var router = express.Router();

router.route('/notes')
.get(GetNotes)
.post(CreateNote);

router.route('/notes/:noteId')
.get(ReadOneNote)
.put(UpdateOneNote)
.delete(DeleteOneNote);

router.route('/note/converter')
.get(NoteToConverter);

module.exports =  router