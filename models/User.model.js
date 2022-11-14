const { Schema, model } = require('mongoose')
const { ROLES, STUDENT } = require('../const')


const validatePassword = function (password) {
  const re = /^(?=.*[A - Za - z])(?=.*\d)[A - Za - z\d]{ 8, }$/
  return re.test(password)
}


const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minLength: [8, "password must be 8 characters long"] },
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    // add roles setup here
    role: { type: String, enum: ROLES, default: STUDENT }
  },
  {
    timestamps: true,
    versionKey: false
  }
);


module.exports = model('User', userSchema)
// match: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
// password must be 8 characters long and have a number