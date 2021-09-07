
const router = require("express").Router()
const { isLoggedIn, checkRoles, checkId } = require("./../middleware/index")
const User = require("../models/User.model")

// router.get('/editmyprofile/:id', isLoggedIn, checkId, (req, res) => {

//     const { id } = req.params

//     User

//         .findById(id)
//         .then(theStudent => res.render('user-views/edit-my-profil', theStudent))
//         .catch(err => console.log(err))
// })

router.get('/editar', isLoggedIn, (req, res) => {
    const user = req.session.currentUser
    res.render('user-views/edit-my-profile', { user })
})

router.post('/editar', (req, res) => {

    const { username, profileImg, description } = req.body

    User
        .findByIdAndUpdate({ username, profileImg, description }, { new: true })
        .then(() => res.redirect('/student'))
        .catch(err => console.log(err))



})
module.exports = router