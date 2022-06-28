const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      min: 8,
      required: true
    },
    profileImg: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png',
      required: true
    },
    description: {
      type: String,
      default: 'No existe descripción.',
      required: true
    },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT',
      required: true
    },
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
