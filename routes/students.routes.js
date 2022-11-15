const { isLoggedIn } = require("../middleware/route-guard")

const router = require("express").Router()

const User = require('../models/User.model')

router.get('/estudiantes', isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(users => {
            res.render('students/list', { users: users })

        })
        .catch(err => console.log(err))
})

router.get('/estudiantes/detalles/:user_id', isLoggedIn, (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)

        //este bloque consigue renderizar la info de la base de datos, pero elimina el renderizado condicional de los botones

        // .then(userFromDB => {
        //     res.render('students/details', userFromDB)
        // })

        //en cambio este otro, permite el renderizado condicional, pero no muestra la info de la base de datos

        .then(userFromDB => {
            res.render('students/details', {
                userFromDB,
                isPM: req.session.currentUser.role === 'PM'
            })
        })

        .catch(err => console.log(err))
})

router.get('/estudiantes/editar/:user_id', isLoggedIn, (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(userFromDB => {
            res.render('students/edit', userFromDB)
        })
        .catch(err => console.log(err))
})

router.post('/estudiantes/editar', isLoggedIn, (req, res) => {
    const { username, email, profileImg, description } = req.body
    const { user_id } = req.query

    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/estudiantes/detalles/${user_id}`))
        .catch(err => console.log(err))

})

router.post('/estudiantes/eliminar/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/estudiantes'))
        .catch(err => console.log(err))

})


// router.post('/estudiantes/to-dev', isLoggedIn, (req, res) => {

//     const { role } = req.body
//     const { user_id } = req.params

//     User
//         .findByIdAndUpdate(user_id, { role })
//         .then(() => res.redirect(`/estudiantes/detalles/${user_id}`))
//         .catch(err => console.log(err))

// })
// router.post('/estudiantes/to-ta', isLoggedIn, (req, res) => {

//     const { role } = req.body
//     const { user_id } = req.params

//     User
//         .findByIdAndUpdate(user_id, { role })
//         .then(() => res.redirect(`/estudiantes/detalles/${user_id}`))
//         .catch(err => console.log(err))

// })

module.exports = router