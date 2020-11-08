const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NoteSchema = Schema({
	owner: { type: ObjectId, ref: 'User', require: "Log in with username" },
	title: { type: String, default: "Title" },
	body: { type: String, default: "None" },
	date: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note