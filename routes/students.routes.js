const router = require("express").Router()

const { checkLoggedUser, checkRoles } = require('./../middleware')

const User = require('./../models/user.model')

router.get('/list', checkLoggedUser, (req, res) => {

    const isAdmin = req.session.currentUser?.role === 'PM'

    User
        .find()
        .select('username')
        .then(users => res.render('students/students-list', { users, isAdmin}))
        .catch(err => console.log(err))
})

router.get('/edit-profile/:user_id', checkLoggedUser, checkRoles('PM' || 'STUDENT'), (req, res) => res.render('students/edit-profile'))

router.post('/edit-profile/:user_id', checkLoggedUser, checkRoles('PM' || 'STUDENT'), (req, res) => {

    const { profileImg, description } = req.body

    const { user_id } = req.query

    User
        .findById(user_id)
        .create({ profileImg, description })
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))
})

router.get('/edit-role/:user_id', checkLoggedUser, checkRoles('PM'), (req, res) => res.render('students/edit-profile'))

router.post('/edit-role/:user_id', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { profileImg, description } = req.body

    const { user_id } = req.query

    User
        .findById(user_id)
        .create({ profileImg, description })
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))
})



module.exports = router