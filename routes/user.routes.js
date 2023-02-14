const router = require("express").Router()
const User = require('./../models/User.model')
const { isLoggedIn, checkRole, check_RolePM_CurrentUser } = require('../middlewares/route-guard')



router.get("/estudiantes", (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .sort({ username: 1 })
        .then(user => res.render("user/users-page", { user }))
        .catch(err => next(err))
})


router.get("/administradores", (req, res, next) => {

    User
        .find({ role: ['DEV', 'TA', 'PM'] })
        .sort({ username: 1 })
        .then(user => res.render("user/users-page", { user }))
        .catch(err => next(err))
})


router.get('/perfil/editar/:id', isLoggedIn, check_RolePM_CurrentUser, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('user/edit-user', {
                user,
                rolePM: req.session.currentUser?.role === 'PM'
            })
        })
        .catch(err => next(err))
})

router.post('/perfil/editar', isLoggedIn, check_RolePM_CurrentUser, (req, res, next) => {

    const { username, email, profileImg, description, role, id } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/perfil/${id}`))
        .catch(err => next(err))
})


router.post('/perfil/eliminar/:id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/estudiantes'))
        .catch(err => next(err))
})


router.get("/perfil/:id", isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/user-profile', {
            user,
            rolePM: req.session.currentUser?.role === 'PM',
            yourProfile: req.session.currentUser?._id === id && !(req.session.currentUser?.role === 'PM')
        }))
        .catch(err => next(err))
})



module.exports = router
