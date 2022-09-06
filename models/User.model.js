const { Schema, model } = require('mongoose')
const { ROLES, ESTUDIANTE } = require('../const/user.const')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    // add roles setup here
    role: {
      type: String,
      // required: true,
      enum: ROLES,
      default: ESTUDIANTE
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
