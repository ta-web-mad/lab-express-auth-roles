const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		username: { type: String, unique: true },
		name: String,
		password: String,
		profileImg: String,
		description: String,
		// add roles setup here
		role: {
       type: String,
        enum :['STUDENT', 'DEV','TA','PM'],
        default : 'STUDENT'
    },
	},
	{
		timestamps: true,
	}
)

const User = mongoose.model('User', userSchema)

module.exports = User
