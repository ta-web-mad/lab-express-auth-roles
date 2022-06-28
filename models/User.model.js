const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: [true, 'El usuario es obligatorio.'] },
    email: { type: String, unique: true, required: [true, 'El email es obligatorio.'] },
    password: {
      type: String,
      minlength: [8, 'La contraseña no es segura']
    },
    profileImg: {
      type: String, default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    description: {
      type: String, default: 'No existe descripción.', required: [true, 'La descripción es obligatoria.']
    },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT',
      required: [true, 'El rol es obligatoria.']
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
