const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    name: String,
    password: {
      type: String,
      required: true,
    },
    profileImg: String,
    description: String,
    facebookId: String,
    role: {
      type: String,
      enum: ["BOSS", "DEV", "TA", "STUDENT", "GUEST"],
      defult: "GUEST",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User
