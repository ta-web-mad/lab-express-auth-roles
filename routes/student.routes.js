const router = require("express").Router()

const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

const User = require('../models/User.model')

//Show list
router.get("/list", isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(users => {
            res.render('student/list', { users })
        })
        .catch(err => console.log(err))
})

//Get details
router.get('/details/:student_id', (req, res, next) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(users => {
            res.render('student/details', {
                users,
                isPM: req.session.currentUser.role === 'PM',
                isOwner: req.session.currentUser._id === student_id
            })
        })
        .catch(err => console.log(err))
})

//Edit student (render)
router.get('/edit/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(users => {
            res.render('student/edit', users)
        })
        .catch(err => console.log(err))
})

//Edit student (handle)
router.post('/edit/:student_id', (req, res) => {

    const { username, email, profileImg, description } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/student/details/${student_id}`))
        .catch(err => console.log(err))
})

//Delete student 
router.post('/delete/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/student/list'))
        .catch(err => console.log(err))

})
//Update student role
router.get('/updateRole/:role/:student_id', (req, res) => {

    const { role } = req.params
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => res.redirect('/student/list'))
        .catch(err => console.log(err))
})





module.exports = router
