const router = require("express").Router()
const User = require('./../models/user.model')
const { checkLoggedUser} = require('./../middleware')

router.get('/user-profile', checkLoggedUser, (req, res) => {
    const loggedUser = req.session.currentUser
    res.render('user/user-profile', loggedUser)
})
router.get('/users-list', checkLoggedUser, (req, res) => {
   const loggedUser = req.session.currentUser

    User
        .find()
        .then(users => res.render('user/users-list', { users }))
        .catch(err => console.log(err)) 
})
module.exports = router