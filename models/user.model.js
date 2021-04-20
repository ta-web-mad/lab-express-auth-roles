const mongoose = require('mongoose');
const { options } = require('../routes/auth.routes');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    name: String,
    password: String,
    profileImg: String,
    description: String,
    role: {
      type: String,
      enum: ['STUDENT', 'TA', 'DEV'],
      default: 'STUDENT'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
