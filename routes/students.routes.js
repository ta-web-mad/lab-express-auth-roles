const router = require("express").Router();
const app = require('../app')
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const { checkLoggedUser, checkRoles, checkId } = require("../middlewares");

//VER LISTADO DE USUARIOS CON ROLE STUDENTS, PRIMER ENDPOINT CON FILTRO PARA LOGGED USERS
//YA NO PONEMOS /STUDENTS PORQUE ESTÁ EN EL INDEX, COMO ESTA ES LA PAGINA DE INICIO DE STUDENTS 
//SOLO NECESITAMOS LA BARRA '/'
router.get('/', checkLoggedUser, (req,res)=>{

    
    User

    .find({role: 'STUDENT'})
    .select('username role')
    .then((students)=> res.render('users/students', {students}))
    .catch(err=>console.log(err))
})

//AQUI EN LA RUTA YA SOBRA PONER /STUDENTS/... PORQUE EL STUDENTS LO TENEMOS EN EL INDEX

//STUDENT DETAILS
router.get('/students-details/:id', checkLoggedUser, (req,res)=>{

    //VERIFICAMOS SI EL USER LOGGEDIN ES ADMIN
    const isPM = req.session.currentUser?.role === 'PM'
//RECOGEMOS EL ID DEL STUDENT SELECCIONADO 
    const {id} = req.params

    User
//BUSCAMOS EL STUDENT CON ESE ID, DESPLEGAMOS SU INFO E INCORPORAMOS FUNCIONALIDAD ESPECIAL
//EN CASO DE QUE ADMIN ENTRE EN DICHO APARTADO, TENDRÁ 'EDIT AND DELETE'
    .findById(id)
    .then(student=>res.render('users/students-details', {student, isPM}))
    .catch(err=>console.log(err))
})


//EDIT STUDENT PROFILE BY STUDENT, POR TERMINAR Y HACER BIEN, 

// router.get('/profile/:id', checkLoggedUser,(req, res) => {

    
//     const isStudent = req.session.currentUser.id 
//     const { id } = req.params

//     User
//         //BUSCAMOS EL STUDENT CON ESE ID, DESPLEGAMOS SU INFO E INCORPORAMOS FUNCIONALIDAD ESPECIAL
//         //EN CASO DE QUE ADMIN ENTRE EN DICHO APARTADO, TENDRÁ 'EDIT AND DELETE'
//         .findById(id)
//         .then(student => res.render('users/profile', { student, isStudent }))
//         .catch(err => console.log(err))
// })




//DELETE USER


//ATENCIÓN, PÉRDIDA ENORME DE TIEMPO, PRIMERO PORQUE NO ESTABA PONIENDO QUE TIENE QUE SER ADMIN
//SEGURO PORQUE EL BOTON DE ELIMINAR HABIA DE SER UN FORM CON UN ACTION=/ROUTE Y METHOD POST
//PARA DESPUÉS PERFORMAR LA ACCIÓN AQUÍ ABAJO.
router.post('/:id/remove', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { id } = req.params
    

    User

        .findByIdAndRemove(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

module.exports = router