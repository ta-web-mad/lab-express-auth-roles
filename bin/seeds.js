const mongoose = require('mongoose')
const User = require('./../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)
const password = 'ironman'
const hashPass = bcrypt.hashSync(password, salt)


const dbName = 'Ironhackwebsite'
mongoose.connect(`mongodb://localhost/${dbName}`)

const user = [
    {
        username: 'Tony',
        name: 'Tony Stark',
        password: hashPass,
        profileImg: 'http://backtothegames.cl/desarrollobttg/wp-content/uploads/2019/11/f0d3f9063896bd44631cb386ebdfd914.jpg',
        description: 'Superhero and head of Stark Industries.',
        facebookId: 'https://es-es.facebook.com/El-mejor-superheroe-es-iron-man-361183957246396/',
        role: 'BOSS'
    },
];



User
    .create(user)
    .then(console.log('User added successfully'))
    .catch(err => console.log('There is an error:', err))
