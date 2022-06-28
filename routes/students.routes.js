const router = require("express").Router();
//const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware/session-guard')
const { rolesChecker } = require("../utils/roles-checker");


//Lista de estudiantes

router.get('/students', isLoggedIn, (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .then(students => res.render('students/list', { students, roles }))
        .catch(err => console.log(err))
})

// Perfil de cada estudiante (solo puede hacer el propio estudiante)


router.get('/miprofile', isLoggedIn, (req, res, next) => {

    res.render('students/profile', { user: req.session.currentUser })

})

// Ver detalles del perfil de los estudiantes

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(student => {

            res.render('students/details', { student })
        })
        .catch(err => console.log(err))
})

// Actualizar mi perfil

router.get('/student/:id/updatemiprofile', (req, res, next) => {

    const { id } = req.params
    console.log("hola aqui estamos")

    User

        .findById(id)
        .then(student => {
            res.render('students/form-editperfil', student)
        })
        .catch(err => console.log(err))
});

router.post('/student/:id/updatemiprofile', (req, res, next) => {

    const { id } = req.params
    const { email, userPDW, username, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { email, userPDW, username, profileImg, description })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
});



module.exports = router