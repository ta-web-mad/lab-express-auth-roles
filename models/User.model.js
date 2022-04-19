const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://i.pinimg.com/564x/d7/1b/f4/d71bf49df9e8eabb505e00f3104c89a5.jpg' },
    description: { type: String, default: 'No existe descripción.' },
    role: { type: String, enum: ['STUDENT', 'DEV', 'TA', 'PM'], default: 'STUDENT'}
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
