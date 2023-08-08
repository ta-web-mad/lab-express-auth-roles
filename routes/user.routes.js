const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn } = require("../middlewares/route-protect")


//iteration#1 

//--> crear un /students endpoint que te de la lista de estudiantes
router.get('/students', isLoggedIn, (req, res) => {

    User
        .find()
        .then((studentList) => { res.render('students/students-list', { studentList }) })
        .catch(err => console.log(err))
})

//crear el acceso al perfil de cada estudiante y que esté protegido: ha de estar logeado el usuario para ver su perfil
router.get('/students/:users_id', (req, res) => {

    const { users_id } = req.params

    User
        .findById(users_id)
        .then(student => { res.render('students/student-profile', student) })
})
















module.exports = router