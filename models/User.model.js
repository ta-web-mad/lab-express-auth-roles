const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },  
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No description given' },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT'
    },
    isSame: Boolean
  },
  {
    timestamps: true
  }
)

module.exports = model('User', userSchema)
