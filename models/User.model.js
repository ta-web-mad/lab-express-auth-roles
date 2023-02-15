const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String
    },
    profileImg: {
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png'
    },
    description: {
      type: String,
      default: 'No existe descripción.'
    },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT'
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('User', userSchema)
