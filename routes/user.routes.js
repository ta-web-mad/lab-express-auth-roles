const router = require("express").Router()

const { isLoggedIn, checkRoles, isOwnerOrPM } = require('../middlewares/route-guard')

const Student = require('../models/User.model')
const Course = require('../models/Course.model')



router.get("/", (req, res, next) => {
    res.render("index")
})

// READ STUDENTS
router.get('/student-list', (req, res, next) => {

    Student
        .find({ role: 'STUDENT' })
        .select({ username: 1 })
        .sort({ username: 1 })
        .then(allStudents => res.render('students/student-list', { allStudents }))
        .catch(error => console.log(error));
});

// STUDENT DETAILS
router.get('/students/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    const userRole = {
        isAdmin: req.session.currentUser?.role === 'PM',
        isOwner: req.session.currentUser?._id === id
    }


    Student
        .findById(id)
        .then(student => res.render('students/student-detail', { student, userRole }))
        .catch(err => console.log(err))
})

// STUDENT EDIT FORM (render) - PROTECTED
router.get("/students/edit/:id", isLoggedIn, isOwnerOrPM, (req, res, next) => {

    const { id } = req.params

    Student
        .findById(id)
        .then(student => res.render("students/edit", student))
        .catch(err => console.log(err))
})


// STUDENT EDIT FORM (handler) - PROTECTED
router.post("/students/edit/:id", isLoggedIn, isOwnerOrPM, (req, res, next) => {


    const { username, email, profileImg, description } = req.body
    const { id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

    Student
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

// STUDENT CONVERT DEV FORM (handler) - PROTECTED //
router.post("/students/:id/dev", isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

    Student
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

// STUDENT CONVERT TA FORM (handler) - PROTECTED //
router.post("/students/:id/ta", isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

    Student
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})


// STUDENT DELETE - PROTECTED
router.post('/students/delete/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    Student
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/student-list`))
        .catch(err => console.log(err))
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





module.exports = router