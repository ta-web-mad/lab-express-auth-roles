const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn } = require('../middleware/session-guard')
const { rolesChecker } = require('../utils/roles-checker')
const { checkRole } = require('../middleware/roles-checker')
const { isOwnerId } = require('../middleware/is-owner')



//Student list
router.get('/students', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .then(user => res.render('students/list', { user, roles }))
        .catch(err => console.log(err))

})

//Details students
router.get('/students/:_id/details', isLoggedIn, (req, res, next) => {

    const { _id } = req.params
    const roles = rolesChecker(req.session.currentUser)

    User
        .findById(_id)
        .then(user => res.render('students/details', { user, roles }))
        .catch(err => console.log(err))
})


//Deleten user admin

router.post('/students/:_id/delete', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//edit user
router.get('/students/:_id/edit', isLoggedIn, isOwnerId, (req, res) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(drone => res.render('students/update-profile', drone))
        .catch(err => console.log(err))
})

router.post('/students/:_id/edit', isLoggedIn, isOwnerId, (req, res) => {

    const { username, email, description } = req.body
    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { username, email, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})


//Change role
router.post('/students/:_id/edit-role-TA', isLoggedIn, (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.post('/students/:_id/edit-role-DEV', isLoggedIn, (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

module.exports = router