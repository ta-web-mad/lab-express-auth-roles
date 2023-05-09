const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    profileImg: { type: String, default: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/naruto-1505307397.jpg' },
    description: { type: String, default: 'No existe descripción.' },
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
