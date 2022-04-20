const router = require("express").Router()
const Student = require('../models/User.model')

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')



router.get("/students", isLoggedIn, (req, res, next) => {

    const isAdmin = req.session.currentUser.roles === 'PM'
    const isStudent = req.session.currentUser.roles === 'STUDENT'

    Student
        .find()
        .then(students => {
            console.log("Student", students)
            res.render('students/allStudents', { students, isAdmin, isStudent })
        })
        .catch(err => console.log(err))
})
router.get("/students/:id", isLoggedIn, (req, res, next) => {

    const { id } = req.params
    console.log(id);
    const isMine = req.session.currentUser._id === id
    const isTA = req.session.currentUser.roles === "TA"

    Student
        .findById(id)
        .then(student => {
            res.render('students/detailsStudent', { student, isMine, isTA })
        })
        .catch(err => console.log(err))
});


router.get("/students/name/:id", isLoggedIn, (req, res, next) => {


    const { id } = req.params
    // const { username, email, description } = req.body

    if (req.session.currentUser.roles == 'PM' || req.session.currentUser._id == id) {


        const { id } = req.params

        Student
            .findById(id)
            .then(student => {
                res.render('students/editStudentsPM', student)
            })
            .catch(err => console.log(err))
    }

});

router.post("/students/name/:id", isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { username, email, description } = req.body

    Student
        .findByIdAndUpdate(id, { username, email, description })
        .then(() => {
            res.redirect(`/students`)
        })
        .catch(err => {
            console.log(err)
        })
});







module.exports = router