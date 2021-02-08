const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      default: "Your name here"
    },
    password: {
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      default: "https://memegenerator.net/img/instances/71755474.jpg"
    },
    description: String,
    facebookId: String,
    role: {
      type: String,
      enum: ["BOSS", "DEV", "TA", "STUDENT", "GUEST"],
      default: "GUEST"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
