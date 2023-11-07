const router = require("express").Router()

const User = require('../models/User.model')

const { isLoggedIn, checkRoles } = require('../middleware/route-guard')

router.get('/', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then((students) => {
            res.render('user/list', { students })
        }
        )
        .catch(error => next(error))
})

router.get('/detalles/:_id', isLoggedIn, (req, res, next) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then((student) => {
            res.render('user/detail',
                { student, isPmOrOwner: req.session.currentUser.role === 'PM' || req.session.currentUser._id === _id, isPm: req.session.currentUser.role === 'PM' })
        })
        .catch(error => next(error))
})

router.get('/editar/:_id', isLoggedIn, checkRoles(true, 'PM'), (req, res, next) => {
    const { _id } = req.params

    User
        .findById(_id)
        .then((student) => {
            res.render('user/edit', { student, isPm: req.session.currentUser.role === 'PM' })
        })
        .catch(error => next(error))
})

router.post('/editar/:_id', isLoggedIn, checkRoles(true, 'PM'), (req, res, next) => {
    let { username, profileImg, description } = req.body
    const { _id } = req.params

    if (username.length === 0) {
        res.render('user/edit', { errorMessage: 'Completa el username' })
        return
    }

})
module.exports = router