const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ['STUDENT', 'TA', 'PM', 'dev'],
    default: 'STUDENT',
  },
  password: String,
}, {
  timestamps: true
})

const User = model("User", userSchema);

module.exports = User;
