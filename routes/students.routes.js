const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/sesion-guard');
const { rolesChecker } = require("../utils/roles-checker");
const { checkRole } = require("../middleware/roles-checker");


router.get('/', isLoggedIn, (req, res) => {

    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .then(user => res.render('students/students-list', { user, roles }))
        .catch(err => console.log(err))
})

router.get('/:user_id/edit', isLoggedIn, (req, res) => {

    const roles = rolesChecker(req.session.currentUser)
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('pm/edit-user', { user, roles })
        })
        .catch(err => console.log(err))
})


router.post('/:user_id/edit', isLoggedIn, (req, res) => {

    const { email, username, profileImg, description } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, username, profileImg, description })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => console.log(err))
})


router.get('/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const roles = rolesChecker(req.session.currentUser)

    User
        .findById(user_id)
        .then(user => {
            res.render('students/students-profile', { user, roles })
        })
        .catch(err => console.log(err))
})

router.post('/eliminar/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})

router.get('/:user_id/change', isLoggedIn, checkRole('PM'), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: 'DEV' })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => console.log(err))

})

router.get('/:user_id/changeTA', isLoggedIn, checkRole('PM'), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: 'TA' })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => console.log(err))

})



module.exports = router
