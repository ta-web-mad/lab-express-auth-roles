const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')


router.get('/students',isLoggedIn, (req,res,next) => {

    User
        .find()
        .then( students => {

            res.render('students-list',{students})
        })
    
    .catch(err => console.log(err))
})

router.get('/students/:id',isLoggedIn, (req,res,next) => {

    const {id}= req.params

    User
        .findById(id)
        .then(student => {

           res.render('student-details',student)

        })
        .catch(err => console.log(err))
})

//editar estudiantes:

router.get('/students/:id/editar',checkRole('PM'), (req,res,next) => {
    
    const {id}= req.params

    User
        .findById(id)
        .then(user => {
            res.render('student-edit', user)
        })
        .catch(err => console.log(err))
      
})

router.post('/students/:id/editar',(req,res,next) => {

    const {id}= req.params
    const {username, email, description }= req.body

    User
        .findByIdAndUpdate(id,{username, email, description })
        .then(student =>{

            res.redirect('/students')
        } )
        .catch(err => console.log(err))

})

//borrado de usuario

router.post('/students/:id/eliminar',checkRole('PM'), (req,res,next) => {

    const {id}= req.params

    User
        .findByIdAndDelete(id)
        .then(() => {

            res.redirect('/students')

        })
        .catch(err => console.log(err))

})



module.exports = router