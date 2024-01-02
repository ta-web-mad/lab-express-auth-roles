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
      default: 'https://i.pinimg.com/564x/b8/5f/3a/b85f3a28fd572685b0dab45537113294.jpg' 
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
);


module.exports = model('User', userSchema)
