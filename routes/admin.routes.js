const router = require("express").Router();
const app = require('../app')
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const { checkLoggedUser, checkRoles } = require("../middlewares");


//IMPORTANTE LEER, GRAN PAIN POINT A LA HORA DE ASIGNAR EL NUEVO VALOR DEL ROL AL USUARIO, MÁS ABAJO, VER QUE HAY QUE HACER UN POST
//PARA CADA UNO DE LOS DOS BOTONES QUE REALIZA UNA FUNCIÓN DIFERENTE.
//FINALMENTE.......==> EL NUEVO VAOR VA DENTRO DEL FINBYIDUPDATE, PASAMOS EL IF Y DECRETAMOS EL NUEVO VALOR DEL ATRIBUTO ROLE...


//ABRIMOS PESTAÑA DE ADMIN PARA PODER EDITAR ROLES CON UN FORM
router.get('/', checkLoggedUser, checkRoles('PM'), (req, res) => {


    User

        .find({ role: 'STUDENT' })
        .then((users) => res.render('admin/admin', { users }))
        .catch(err => console.log(err))

})

//DESPLIEGO LOS ESTUDIANTES EN EL PANEL

router.get('/edit-role/:id/:role', checkLoggedUser, checkRoles('PM'), (req,res)=>{


    const {id} = req.params

    User

    .findById(id)
    .then((user)=> res.render('admin/edit-roles', user))
    .catch(err=>console.log(err))
})


//HACEMOS UN POST PARA CADA BOTÓN QUE CAMBIA EL ROLE
router.post('/edit-role/:id/dev', checkLoggedUser,checkRoles('PM'), (req,res)=>{

    const{id} = req.params
    const{role} = req.body

    User

    .findByIdAndUpdate(id,{role: 'DEV' })//GRAN PAIN POINT PARA MI, HE PROBADO FUNCIONES, ONCLICK() EN EL HTML, ETC...
    .then(()=>res.redirect('/admin'))//AL FINAL ES MUCHO MÁS SENCILLO!! PASAMOS ID Y MODIFICAMOS EL ATRIBUTO ROLE AL QUE QUERAMOS

})

router.post('/edit-role/:id/ta', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { id } = req.params
    const { role } = req.body

    User

        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/admin'))

})

module.exports = router