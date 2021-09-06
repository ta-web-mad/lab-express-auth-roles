const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      unique: true 
    },
    role: {
      type: String,
      enum: ['STUDENT', 'TA', 'PM'],
      default: 'STUDENT',
    },
    name: String,
    password: String,
    profileImg: String,
    description: String,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;


