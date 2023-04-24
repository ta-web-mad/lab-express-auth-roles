const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(?=.*\d).{8,}$/.test(v);
        },
        message: "Password must have at least 8 characters and 1 number",
      },
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
