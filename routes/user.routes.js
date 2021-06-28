const router = require("express").Router()

const { checkLoggedUser, whatever } = require('./../middleware')

router.get('/my-profile', checkLoggedUser, whatever, (req, res) => {
    const loggedUser = req.session.currentUser
    res.render('user/user-profile', loggedUser)
})




module.exports = route