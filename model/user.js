const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = Schema({
	username: { 
		type: String, 
		unique: true,
		required: "username is needed", 
	},
	email: { 
		type: String,
		required: "email is required",
		unique: true
		// match: [/^ (\w+ (.*)?) + @ [a-z]{2,4} . [a-z]{2,3} $/, "email does not seem correct"]
	},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

var User = mongoose.model('User', UserSchema);

module.exports = User