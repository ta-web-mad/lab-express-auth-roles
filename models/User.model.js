const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    description: {
      type: String,
      default: 'No existe descripción.'
    },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT'
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
