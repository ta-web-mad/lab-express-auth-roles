const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles, checkStudent } = require('../middlewares/route.guard')

// student list
router.get("/student-list", isLoggedIn, (req, res, next) => {


    User
        .find()
        .sort({ name: 1 })
        .then(user => res.render('user/student-list', { user }))
        .catch(err => console.log(err))
})

// Profile de estudiante
router.get("/student-profile/:user_id", isLoggedIn, (req, res, next) => {
    const { user_id } = req.params
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isStudent: req.session.currentUser?._id === user_id
    }
    User
        .findById(user_id)
        .then(user => res.render('user/student-profile', { user, userRole }))
        .catch(err => console.log(err))
})

// Para editar estudiante
router.get("/student-edit/:user_id", isLoggedIn, checkStudent, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/student-edit', user))
        .catch(err => console.log(err))
})

router.post("/student-edit/:user_id", isLoggedIn, checkStudent, (req, res, next) => {

    const { username, email, profileImg, description, role } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/student-profile/${user_id}`))
        .catch(err => console.log(err))

})

// delete 
router.post('/student-delete/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect(`/student-list`))
        .catch(err => console.log(err))
})

// convertir a dev (metodo post igual que delete)
router.post("/student-dev/:user_id", isLoggedIn, checkRoles("PM"), (req, res, next) => {

    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role: 'DEV' })
        .then(() => res.redirect(`/student-profile/${user_id}`))
        .catch(err => console.log(err))

})

//convertir a TA (idem Dev)
router.post("/student-ta/:user_id", isLoggedIn, checkRoles("PM"), (req, res, next) => {

    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role: 'TA' })
        .then(() => res.redirect(`/student-profile/${user_id}`))
        .catch(err => console.log(err))

})


module.exports = router