const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://media.istockphoto.com/id/1142192548/es/vector/perfil-de-avatar-hombre-silueta-de-cara-masculina-o-icono-aislado-sobre-fondo-blanco.jpg?s=1024x1024&w=is&k=20&c=Sa6_49lLlCEnqdLyHQUYNbQ0yRInuZ0yUmhI4lTHax0=' },
    description: { type: String, default: 'No existe descripción.' },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', 'PM'],
      default: 'STUDENT'
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
