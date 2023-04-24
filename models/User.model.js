const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYrnSJeMTj5XCUfbCvZ43CMY-ZU2Y23nmZvKZjE-thA&s",
    },
    description: { type: String, default: "No existe descripción." },
    // add roles setup here
    roles: {
      type: String,
      enum: ["STUDENT", "TA", "DEV", "PM"],
      default: "STUDENT",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
