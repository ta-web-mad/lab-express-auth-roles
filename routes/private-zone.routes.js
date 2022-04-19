const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')

// Students
router.get('/students', (req, res, next) => {

    User
        .find()
        .then(users => res.render('private/students', { users }))

})

router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    User
        .findById(req.params.id)
        .then(user => res.render('private/student', { user, isPM}))
        .catch(error => next(error));

})

router.get('/students/:id/edit', isLoggedIn, checkRole("PM"), (req, res, next) => {


    // const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    User
        .findById(req.params.id)
        .then(user => res.render('private/edit-student', user))
        .catch(error => next(error));

})

router.post('/students/:id/edit', isLoggedIn, checkRole("PM"), (req, res, next) => {


    // const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    const { username, email, password, profileImg, description } = req.body
    User
        .findByIdAndUpdate(req.params.id, { username, email, password, profileImg, description })
        .then(user => res.redirect(`/students/${req.params.id}`))
        .catch(error => next(error));

})

router.post('/students/:id/setRole/:role', isLoggedIn, checkRole("PM"), (req, res, next) => {


    // const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    const role = req.params.role
    const { username, email, password, profileImg, description } = req.body
    User
        .findByIdAndUpdate(req.params.id, { username, email, password, profileImg, description, role })
        .then(user => res.redirect(`/students/${req.params.id}`))
        .catch(error => next(error));

})

router.post('/students/:id/delete', isLoggedIn, checkRole("PM"), (req, res, next) => {


    User
        .findByIdAndRemove(req.params.id)
        .then(user => res.redirect('/students'))
        .catch(error => next(error));

})

// router.post('/registro', (req, res, next) => {

//     const { userPwd } = req.body

//     bcrypt
//         .genSalt(saltRounds)
//         .then(salt => bcrypt.hash(userPwd, salt))
//         .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
//         .then(createdUser => res.redirect('/'))
//         .catch(error => next(error))
// })



// // Login
// router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))
// router.post('/iniciar-sesion', (req, res, next) => {

//     const { email, userPwd } = req.body

//     User
//         .findOne({ email })
//         .then(user => {
//             if (!user) {
//                 res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
//                 return
//             } else if (bcrypt.compareSync(userPwd, user.password) === false) {
//                 res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
//                 return
//             } else {
//                 req.session.currentUser = user
//                 res.redirect('/')
//             }
//         })
//         .catch(error => next(error))
// })


// // Logout
// router.post('/cerrar-sesion', (req, res, next) => {
//     req.session.destroy(() => res.redirect('/iniciar-sesion'))
// })

module.exports = router
