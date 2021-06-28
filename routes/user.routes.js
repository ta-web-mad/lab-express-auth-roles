const router = require("express").Router()

const { checkLoggedUser } = require('./../middleware')

router.get('/my-profile', checkLoggedUser, (req, res) => {
    const loggedUser = req.session.currentUser
    res.render('user/user-profile', loggedUser)
})




module.exports = router 