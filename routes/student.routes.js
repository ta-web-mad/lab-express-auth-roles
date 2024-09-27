const router = require("express").Router()
const { isLoggedIn } = require("../middleware/route-guard")
const Student = require('./../models/User.model')


router.get('/students/list', isLoggedIn, (req, res) => {

    Student
        .find()
        .then(students => {
            res.render('students/students-list', { students })
        })
        .catch(err => console.log(err))
})


router.get('/students/detail/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    Student
        .findById(id)
        .then(students => {
            res.render('students/student-detail', {
                students,
                isPm: req.session.currentUser.role === 'PM',
                currentStudent: req.session.currentUser._id.toString() === id
            })
        })
        .catch(err => console.log(err))

})



router.get('/students/edit/:id', (req, res) => {

    const { id } = req.params

    Student
        .findById(id)
        .then(student => {
            console.log(student)
            res.render('students/student-edit', {
                student,
                isPm: req.session.currentUser.role === 'PM',
                currentStudent: req.session.currentUser._id.toString() === id
            })
        })
        .catch(err => console.log(err))
})

router.post('/students/edit', (req, res) => {

    const { username, email, description, role } = req.body
    const { id } = req.query
    const currentStudent = req.session.currentUser._id.toString()
    if (currentStudent === id || req.session.currentUser.role === 'PM') {
        Student
            .findByIdAndUpdate(id, { username, email, description, role })
            .then(() => res.redirect(`/students/detail/${id}`))
            .catch(err => console.log(err))
    } else {
        res.redirect('/students/list')
    }
})

router.post('/students/delete/:id', (req, res) => {

    const { id } = req.params

    Student
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))

})

module.exports = router