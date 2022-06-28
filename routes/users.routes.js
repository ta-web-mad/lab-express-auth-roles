const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware/session-guard')
const { rolesChecker } = require("../utils/roles-checker");
const { findByIdAndUpdate } = require("../models/User.model");

//Students

router.get('/students', isLoggedIn, (req, res) => {

    User
        .find()
        .then(users => res.render('user-list', { users })) ///Este users es el objeto que nos traemos con el .find() de la base de datos
        .catch(err => console.log(err))
})


router.get('/students/:users_id', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    const roles = rolesChecker(req.session.currentUser)

    User
        .findById(users_id)
        .then(user => {
            res.render('users-details', { user, roles })
        })
        .catch(err => console.log(err))
})


router.post('/students/:user_id/delete', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.get('/students/:user_id/edit', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user =>
            res.render('edit-students', user)
        )
        .catch(err => console.log(err))

})


router.post('/students/:user_id/edit', (req, res) => {

    //res.send(req.body)

    const { username, email, profileImg, description } = req.body
    //const user_id = req.params.user_id //cuando está entre barras es params, cuando está con interrogaciones, es lo mismo que:

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description })
        .then(user => res.redirect('/students'))
        .catch(err => console.log(err))






})




module.exports = router