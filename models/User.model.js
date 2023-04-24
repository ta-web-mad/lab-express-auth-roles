const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Z]).{8}$/,
        "Password needs to have at least 8 chars and must contain one number.",
      ],
    },

    role: {
      type: String,
      enum: ["STUDENT", "DEV", "TA", "PM"],
      default: "STUDENT",
      required: true,
    },
    profileImg: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
      required: true,
    },
    description: {
      type: String,
      default: "No existe descripción.",
      required: true,
    },
    // add roles setup here
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
