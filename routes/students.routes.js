const router = require("express").Router()
const userModel = require('../models/User.model');
const { roleValidation } = require("../middleware/is_logedin.middleware");
const { PM, STUDENT, DEV, TA, ROLES } = require('../const/user.const');

router.get('/students', roleValidation(ROLES), (req, res, next) => {
    userModel
        .find()
        .then((foundStudents) => {
            res.render('students', { foundStudents })
        })
        .catch((err) => {
            console.error(err);

        })

})

router.get('/students/:id', roleValidation(ROLES), (req, res, next) => {
    const studentsID = req.params.id
    userModel
        .findById(studentsID)
        .then(student => {
            // console.log('NO CONFIO ==>', student)
            res.render('student-profile', student)
        })
        .catch((err) => {
            console.error(err);

        })
})

router.get('/students/delete/:id', roleValidation(PM), (req, res) => {
    const { id } = req.params
    userModel
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(e => console.log(e))
})

router.get('/students/update/:id', roleValidation(PM), (req, res) => {
    const { id } = req.params
    // console.log(req.params) 
    userModel
        .findById(id)
        .then(user => {
            res.render('update-student', user)
        })
        .catch((err) => {
            console.error(err);

        })
})

// POST

router.post('/students/update/:id', (req, res, next) => {
    const updatedId = req.params.id
    const { username, description, role } = req.body

    userModel
        .findByIdAndUpdate(updatedId, { username, description, role }) // Dos parámetros {1- buscar 2-editar}
        .then(updateUser => {
            res.redirect(`/students/${updateUser._id}`)
        })
        .catch((err) => {
            console.error(err);
            next(err)
        })

})


module.exports = router

