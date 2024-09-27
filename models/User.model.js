const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 8 },
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png', required: true },
    description: { type: String, default: 'No existe descripción.' },
    // add roles setup here
    role: {
      type: String,
      Enum: ['STUDENT', 'TA', 'DEV', 'PM'],
      default: 'STUDENT'
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
