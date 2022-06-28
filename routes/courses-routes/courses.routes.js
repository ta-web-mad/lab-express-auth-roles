const router = require("express").Router();

const User = require("../../models/User.model")
const Course = require("../../models/Course.model");


router.get('/crear-curso', (req, res) => {

    User
        .find()
        .then(users => {
            res.render('courses/new-course', { users })
        })
        .catch(err => console.log(err))
})

router.post('/crear-curso', (req, res) => {

    const { title, leadteacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadteacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => {
            res.redirect('/cursos')
        })

        .catch(err => console.log(err))
})