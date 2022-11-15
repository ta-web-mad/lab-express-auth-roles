const { isLoggedIn } = require("../middleware/route-guard")

const router = require("express").Router()

const User = require('../models/User.model')

router.get('/estudiantes', isLoggedIn, (req, res, next) => {
    // console.log('me saco la ruta de estudiantes por consola')

    User
        .find()
        .select({ username: 1 })
        .then(users => {
            res.render('students/list', { users: users })

        })
        .catch(err => console.log(err))
})

router.get('/estudiantes/detalles/:user_id', (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(userFromDB => {
            res.render('students/details', userFromDB)
        })
        .catch(err => console.log(err))
})

module.exports = router