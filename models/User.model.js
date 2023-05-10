const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    password: String,
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT',
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
