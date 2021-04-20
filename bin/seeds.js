require('dotenv').config()

const mongoose = require('mongoose')
// DB connection
require('./../config/db.config')

const User = require('./../models/user.model')

// Seed here!
User.collection.drop();
const ironHack = [
    {
        username: "Achraf6",
        name: "Achraf",
        password: "2b$10$qUcEthRxiZN/jW4TiU5Wk.KDQ.wCNQbcByGYATAX14C5N8U2KUpgC",
        profileImg: "",
        description: "Soy el mejor"
    },
    {
        username: "Achraf6",
        name: "Achraf",
        password: "2b$10$qUcEthRxiZN/jW4TiU5Wk.KDQ.wCNQbcByGYATAX14C5N8U2KUpgC",
        profileImg: "",
        description: "Soy el mejor",
        role: "TA"
    }
]

User
    .create(ironHack)
    .then(res => {
        console.log("Hola, ya hay alumnos");
        mongoose.connection.close()
    })
    .catch(err => console.log('se produjo un error...', err))