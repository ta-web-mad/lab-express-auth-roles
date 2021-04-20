const express = require('express')
const router = express.Router()

const Student = require('./../models/user.model')

const { isValidIdFormat, isBoss } = require('./../utils')



router.get('/', (req, res) => {

    Student
        .find()
        .then(allStudents => res.render('pages/students/students-list', { allStudents, msg: req.query.msg, isBoss: isBoss(req.session.currentUser) }))
        .catch(err => console.log('Error!', err))
})

router.get('/details/:student_id', (req, res) => {

    const { student_id } = req.params

    if (isValidIdFormat(student_id)) {

        Student
            .findById(student_id)
            .then(theStudent => res.render('pages/students/student-detail', { theStudent, msg: req.query.msg, isBoss: isBoss(req.session.currentUser) }))
            .catch(err => console.log('Error!', err))

    } else {
        res.redirect('/students')
    }
})



router.get('/edit', (req, res) => {

    const { student_id } = req.query

    Student
        .findById(student_id)
        .then(student => res.render('pages/students/edit-student', student))
        .catch(err => console.log('Error!', err))
})

router.post('/edit', (req, res) => {

    console.log(req.query)
    const { student_id } = req.query
    const { username, description, role } = req.body

    Student
        .findByIdAndUpdate(student_id, { username, description, role })
        .then(updatedStudent => {
            console.log(updatedStudent);
            res.redirect(`/students`)
        })
        .catch(err => console.log('Error!', err))
})

router.post('/delete/:student_id', (req, res, next) => {
    const { student_id } = req.params
    Student
        .findByIdAndRemove(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => {
            next();
            console.log('Error!', err)
        })
})



module.exports = router