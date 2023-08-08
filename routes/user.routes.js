const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require("../middlewares/route-protect")


//iteration#1 

//--> crear un /students endpoint que te de la lista de estudiantes
router.get('/students', isLoggedIn, (req, res) => {

    User
        .find()
        .then((studentList) => { res.render('students/students-list', { studentList }) })
        .catch(err => console.log(err))
})

//Iteration#2

//crear el acceso al perfil de cada estudiante y que esté protegido: ha de estar logeado el usuario para ver su perfil
router.get('/students/:users_id', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    User
        .findById(users_id)
        .then((student) => {

            const isPM = req.session.currentUser?.role === 'PM'
            res.render('students/student-profile', { student, isPM })
        })
        .catch(err => console.log(err))
})

//en el modelo usuario, buscalo por su id , entonces, creamos una cosntante, llamada isPM
//que definimos como que el usuario logado en ese momento tiene que ser el PM (con la ? para
//que si NO es el PM se cumpla que cualquier usuario logado pueda ver los perfiles), y le 
//pedimos que nos renderice la vista del perfil del estudiante en donde hemos indicado el 
//if para el isPm --> lo que queremo que se vea si el que se loga es el PM


module.exports = router