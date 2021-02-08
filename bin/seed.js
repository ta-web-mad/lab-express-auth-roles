require('dotenv').config()

const mongoose = require('mongoose')
const User = require('./../models/user.model')

mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })

const userBoss = {
    username: 'chiquitoTheBoss',
    name: 'Chiquito de la Calzada',
    password: '$2b$10$TZworpEgfdd5HePBtYBdVOj4geenTKT2LJQr056.RNSbT0DMv2jsu',
    profileImg: 'https://i.blogs.es/427cf5/chiqu/1366_2000.jpg',
    description: '¡Por la gloria de mi madre!',
    facebookId: 'chiquitocalzada',
    role: 'BOSS'
}

User
    .create(userBoss)
    .then(user => {
        console.log(`Se han creado el usuario ${user.username} en la BBDD`)
        mongoose.connection.close()
    })
    .catch(err => console.log(`Se ha producido un error:`, err))