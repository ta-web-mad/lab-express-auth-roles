const router = require("express").Router()

const { checkLoggedUser, whatever } = require('./../middleware')

const User = require('./../models/user.model')

router.get('/list', checkLoggedUser, (req, res) => {


    User
        .find()
        .select('username')
        .then(users => res.render('students/students-list', { users }))
        .catch(err => console.log(err))
})

router.get('/edit-profile/:user_id', checkLoggedUser, (req, res) => res.render('students/edit-profile'))

router.post('/edit-profile/:user_id', checkLoggedUser, (req, res) => {

    const { profileImg, description } = req.body

    const { user_id } = req.query

    User
        .findByIdAndUpdate(user_id, { profileImg, description })
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))
})

module.exports = router