const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES, STUDENT } = require('../const/user.const');
const SALT = Number(process.env.SALT);

const userSchema = new Schema(
  {
    username:
    {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    profileImg: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    description: {
      type: String,
      default: 'No existe descripción.'
    },
    role: {
      type: String,
      enum: ROLES, default: STUDENT
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// userSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const genSalt = bcrypt.genSaltSync(SALT);
//     const hashPassword = bcrypt.hashSync(this.password, genSalt);
//     this.password = hashPassword;
//   }
//   next();
// });

module.exports = model('User', userSchema)
