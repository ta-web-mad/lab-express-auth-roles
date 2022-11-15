const router = require("express").Router()
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

//Students list 

router.get('/students/list', isLoggedIn, checkRoles("PM"), (req, res) => {

    User
        .find({ role: "STUDENT" })
        .select({ username: 1, })
        .then(student => {
            res.render('students/list', { student })
        })
        .catch(err => console.log(err))
})

//Students details, edit and delete only for PM

router.get('/students/details/:student_id', isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {
            res.render('students/details', {
                student,
                isPM: req.session.currentUser.role === "PM"
                // isAdmin: req.session.currentUser.role === 'ADMIN',
                // isEditor: req.session.currentUser.role === 'EDITOR'
            })
        })
        .catch(err => console.log(err))
})


//Edit students only PM -> GET


router.get('/students/edit/:student_id', isLoggedIn, checkRoles("PM"), (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {
            res.render('students/edit', {
                student,
                isPM: req.session.currentUser.role === "PM"
            })
        })
        .catch(err => console.log(err))
})

//Edit students only PM ->POST

router.post('/students/edit', (req, res) => {

    const { username, email, profileImg, description } = req.body
    const { student_id } = req.query

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/details/${student_id}`))
        .catch(err => console.log(err))
})

//Delete students only PM 

router.post('/students/delete/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))

})

module.exports = router