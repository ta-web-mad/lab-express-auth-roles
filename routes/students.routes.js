const router = require("express").Router()

const User = require('./../models/User.model')
const { isLoggedIn, checkRole, checkRoleOwner } = require('../middleware/route-guard')

router.get('/students', isLoggedIn, (req, res) => {
    User
        .find()
        .then(user => res.render('students/list', { user }

        ))
        .catch(err => console.log(err))
})

router.get('/students/details/:_id', isLoggedIn, checkRole('PM', 'STUDENT', 'DEV', 'TA'), (req, res) => {
    const { _id } = req.params
    const isPM = req.session.currentUser.role === 'PM'
    const isOwner = req.session.currentUser._id === _id
    User
        .findById(_id)
        .then(user => res.render('students/details', { user, isPM, isOwner }))
        .catch(err => console.log(err))
})


router.get('/students/editar/:_id', isLoggedIn, checkRoleOwner('PM'), (req, res) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then(user => res.render('students/edit', user))
        .catch(err => console.log(err))
})

router.post('/students/editar/:_id', isLoggedIn, checkRoleOwner('PM'), (req, res) => {
    const { _id } = req.params
    const { email, username, description } = req.body
    console.log({ _id, email, username, description })

    User
        .findByIdAndUpdate(_id, { email, username, description })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})
router.post('/students/delete/:_id', isLoggedIn, checkRole('PM'), (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

});

router.post('/students/categorydev/:_id', checkRole('PM'), (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { role: 'DEV' })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})

router.post('/students/categoryta/:_id', checkRole('PM'), (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { role: 'TA' })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})



module.exports = router