const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole, isPMorCurrentStudent } = require('./../middlewares/route-guard')

// Students
router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => res.render('private/students', { users }))

})

router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'
    const isCurrentStudent = req.session.currentUser._id === req.params.id
    const { id } = req.params
    let userFound = true
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        console.log("yes it match")
        User
            .findById(id)
            .then(user => {
                if (!user) {
                    userFound = false
                }
                res.render('private/student', { user, isPM, isCurrentStudent, userFound, badId: false })
            })
            .catch(error => {
                console.log("thr")
                next(error)
            })
    }
    else res.render('private/student', { badId: true })

})

router.get('/students/:id/edit', isLoggedIn, isPMorCurrentStudent, (req, res, next) => {


    // const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    User
        .findById(req.params.id)
        .then(user => res.render('private/edit-student', user))
        .catch(error => next(error));
})


router.post('/students/:id/edit', isLoggedIn, isPMorCurrentStudent, (req, res, next) => {


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

router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {


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
