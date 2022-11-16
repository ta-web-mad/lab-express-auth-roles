const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, set: v => v === "" ? "https://i.stack.imgur.com/l60Hf.png" : v },
    description: { type: String, default: 'No existe descripción.' },
    role: { type: String, enum: ["STUDENT", "DEV", "TA", "PM"], default: "STUDENT" }
    // add roles setup here
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
