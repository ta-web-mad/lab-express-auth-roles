const router = require("express").Router()
const { isLoggedIn, checkRoles, checkIdUser } = require('./../middlewares/router-guard')


const User = require('./../models/User.model')

// User List
router.get('/students', (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isTA: req.session.currentUser?.role === 'TA'
    }
    User
        .find()
        .then(users => {
            res.render('user/user-list', { users, userRole })
        })
        .catch(err => console.log(err))
})

// User profile
router.get('/students/profile/:user_id', isLoggedIn, (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isTA: req.session.currentUser?.role === 'TA'
    }
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(userFound => {
            res.render('user/user-profile', { userFound, userRole })
        })
        .catch(err => console.log(err))
})

// Edit User profile (render) PRIVATE

router.get('/edit/students/profile/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(userFound => {
            res.render('user/user-edit', userFound)
        })
        .catch(err => console.log(err))
})

// Edit User profile (handler) PRIVATE

router.post('/edit/students/profile/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { email, username, profileImg, description } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, username, profileImg, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

// Delete User profile

router.post('/delete/students/profile/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

// Modify User Rol --> TA
router.post('/edit/students/profile/role/ta/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

// Modify User Rol --> DEV
router.post('/edit/students/profile/role/dev/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

// Modify Own Profile

router.get('/edit/students/ownprofile/:user_id', checkIdUser, (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(userFound => {
            res.render('user/user-edit-own-profile', userFound)
        })
        .catch(err => console.log(err))
})

router.post('/edit/students/ownprofile/:user_id', checkIdUser, (req, res, next) => {

    const { email, username, profileImg, description } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, username, profileImg, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

module.exports = router