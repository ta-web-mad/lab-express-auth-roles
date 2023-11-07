const router = require("express").Router()
const User = require("../models/User.model")
const { formatUser } = require('../utils/formatUser')
const { isLoggedIn, checkValidUser, checkRole } = require('../middleware/route-guard')

router.get('/', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => res.render("user/students-list", { students }))
        .catch(err => console.log('ERROR listing students:', err))

})

router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('user/student-details', {
                formatedStudent: formatUser(student),
                isPM: req.session.currentUser.role === 'PM',
                isOwner: req.session.currentUser._id === id
            })
        })
        .catch(err => console.log('ERROR listing specific student:', err))
})

router.get('/editar/:id', isLoggedIn, checkValidUser('PM'), (req, res) => {

    const { id } = req.params


    User
        .findById(id)
        .then(student => res.render('user/student-edit', { formatedStudent: formatUser(student) }))
        .catch(err => console.log('ERROR listing specific student:', err))

})

router.post('/editar/:id', isLoggedIn, checkValidUser('PM'), (req, res) => {

    const { id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log('ERROR editing specific student:', err))
})



router.post('/eliminar/:id', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log('ERROR deleting specific student:', err))
})


router.post('/promote/:id', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params
    const { role } = req.body
    if (role === 'DEV' || role === 'TA') {
        User
            .findByIdAndUpdate(id, { role })
            .then(() => res.redirect(`/students/${id}`))
            .catch(err => console.log('ERROR editing specific student:', err))
    } else {
        res.redirect(`/students/${id}`)
    }


})

module.exports = router
