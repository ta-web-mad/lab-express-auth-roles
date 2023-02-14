const express = require('express');
const router = express.Router()
const User = require('../models/User.model');
const { isLoggedIn, checkRole } = require('../middlewares/routes-guard')


router.get('/students', isLoggedIn, (req, res) => {

    User
        .find({ role: 'STUDENT' })
        .then(users => {
            res.render('user/students', {
                users: users,
                isPM: req.session.currentUser?.role === 'PM',
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA',
            })
        })
        .catch(err => console.log(err))

})
router.get('/dev', isLoggedIn, (req, res) => {

    User
        .find({ role: ['PM', 'DEV', 'TA'] })
        .then(users => {
            res.render('user/dev', {
                users: users,
                isPM: req.session.currentUser?.role === 'PM',
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA',
            })
        })
        .catch(err => console.log(err))

})


router.get('/students/:id', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('user/students-details', {
                student,
                isPM: req.session.currentUser?.role === 'PM',
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA',
            })
        })
        .catch(err => console.log(err))
})

router.get('/students/edit/:id', isLoggedIn, checkRole('PM', 'DEV'), (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(students => res.render('user/students-edit', students))
        .catch(err => console.log(err))


})
router.post('/students/edit/:id', isLoggedIn, checkRole('PM', 'DEV'), (req, res) => {

    const { username, email, profileImg, description, id } = req.body
    console.log(req.body)
    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})
router.post('/students/:role/edit_role/:id', isLoggedIn, checkRole('PM'), (req, res) => {

    const { role, id } = req.params
    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/dev`))
        .catch(err => console.log(err))

})


// router.get('/students/:perfil/edit_perfil/:id', isLoggedIn,(req, res) => {
//     const {id} = req.params
// }
//             es.render('user/students-details', {
//     student
//     isStudent: req.session.currentUser?.id === 'STUDENT',id)}



router.post('/students/eliminar/:id', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})



module.exports = router