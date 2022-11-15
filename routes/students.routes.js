const router = require("express").Router()

const { findById, find } = require("../models/User.model")
const User = require("../models/User.model")
const { isLoggedIn } = require('../middleware/route-guard')

router.get('/students', (req, res, next) => {
    User
        .find()
        .then(users => {
            console.log(users)
        res.render('users/list',{users})
    })

    .catch(err => console.log(err))
    
})

router.get('/students/profile/:student_id',isLoggedIn, (req, res, next) => {
   const { student_id }=req.params
    
    User
    .findById(student_id)
    .then(student => {
        res.render('users/profile', {
            student,
            isPM: req.session.currentUser.role === 'PM',
            isCurrentUser:req.session.currentUser._id= 'student_id'
        })
    })
    .catch(err => console.log(err))
})

router.get('/students/editar/:student_id',isLoggedIn, (req, res) => {
    const { student_id } = req.params
    
    User
        .findById(student_id)
        .then(student => {
        res.render('users/edit-student',student)
        })
        
    .catch(err => console.log(err))

})

router.post('/students/editar/:students_id', (req, res, next) => {
     const{email,username,userPwd,profileImg,description}=req.body
     const { students_id } = req.params
      User
       .findByIdAndUpdate(students_id, { email,username,userPwd,profileImg,description})
        .then(() => res.redirect('/students'))
     .catch(err => console.log(err))
 })

router.post('/students/eliminar/:students_id', (req, res) => {

  const { students_id } = req.params

  User
    .findByIdAndDelete(students_id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))

})

router.get('/students/:students_id/changerole/:role', (req, res) => {
    const { students_id, role } = req.params
    User
        
        .findByIdAndUpdate(students_id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => {
            console.log(err)
            res.redirect(`/students/edit/${students_id}`)
        })
            
})






module.exports = router