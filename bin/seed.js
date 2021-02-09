const mongoose = require('mongoose')
const User = require('./../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)
const password = 'boss'
const hashPass = bcrypt.hashSync(password, salt)


const dbName = 'ROLES'
mongoose.connect(`mongodb://localhost/${dbName}`)

const user = [{
    username: 'Eva',
    name: 'Eva Vírseda',
    password: hashPass,
    profileImg: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fanimales.uncomo.com%2Farticulo%2Fcomo-cuidar-a-un-carlino-41736.html&psig=AOvVaw12t994DLK0TrU8s1saSMi7&ust=1612936030097000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODEjo2N3O4CFQAAAAAdAAAAABAD',
    description: 'Lab maker',
    role: 'BOSS'
}, {
    username: 'Pepito',
    name: 'Pepito Pérez',
    password: hashPass,
    profileImg: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsipse.com%2Fciencia-y-salud%2Fperro-chihuahua-raza-agresiva-salvaje-estudio-pitbull-223376.html&psig=AOvVaw22tdyduty_bFZBtvkmufIM&ust=1612936436043000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjy8M-O3O4CFQAAAAAdAAAAABAJ',
    description: 'Developer',
    role: 'DEV'
}, {
    username: 'María',
    name: 'García',
    password: hashPass,
    profileImg: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nationalgeographic.com.es%2Fanimales%2Fperros&psig=AOvVaw0si14R-YMk0hMDdGH_qm1n&ust=1612936463319000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCztN2O3O4CFQAAAAAdAAAAABAK',
    description: 'A visitor',
}];



User
    .create(user)
    .then(console.log('THE BOSS'))
    .catch(err => console.log('error:', err))