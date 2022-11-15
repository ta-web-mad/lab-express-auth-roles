const { Schema, model } = require('mongoose')
const { ENUM_ROLES, STUDENT } = require("../const/user.const")

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    role: { type: String, trim: true, enum: ENUM_ROLES, default: 'Student' }
  },
  {
    timestamps: true
  }
);

const UserModel = model("User", userSchema)

module.exports = UserModel
