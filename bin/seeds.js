const mongoose = require('mongoose');
const User = require('../models/user.model');

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const dbName = 'ironhack';
mongoose.connect(`mongodb://localhost/${dbName}`);
const users = {
    username: 'generalManager',
    name: 'GM',
    password: 'boss',
    profileImg: 'img',
    description: 'the big boss',
    facebookId: 'the big boss',
    role: 'BOSS'
};

const salt = bcrypt.genSaltSync(bcryptSalt)
const hashPass = bcrypt.hashSync(users.password, salt)

User
    .create({ ...users, password: hashPass })
    .then(allUsersCreated => {
        console.log(`Created ${allUsersCreated.length} users`)
        mongoose.connection.close();
    })
    .catch(err => console.log('Hubo un error,', err))