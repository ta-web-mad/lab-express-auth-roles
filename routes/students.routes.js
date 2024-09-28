
const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedIn, checkRoles } = require('./../middlewares/route-guard')


router.get("/list", isLoggedIn, (req, res, next) => {
//   res.send("conectado")
    User
        .find()
        .sort({name:1})
        .then(student => {
            
            res.render('students/list', {
                user: {student},
                isPM: req.session.currentUser.role === 'PM'
            })
        })
        .catch(err => console.log(err))
})

router.get("/details/:student_id", isLoggedIn, checkRoles ('PM','STUDENT'), (req, res, next) => {
//   res.send("conectado")
    const {student_id} = req.params
    
    User
        .findById(student_id)       
        .then(student => {
        // res.send(student)
            res.render('students/details', {
                student,
                isPM: req.session.currentUser.role === 'PM',
                studentEditor: req.session.currentUser._id === student_id
            })
        })
        .catch(err => console.log(err))    
})


router.get("/details/:student_id/edit", isLoggedIn, checkRoles ('PM', 'STUDENT'), (req, res, next) => {             
    
    const { student_id } = req.params
    // console.log(student_id)
    User
        .findById(student_id)
        .then(student => {
            // res.send(student)
            res.render('students/edit-student', student)
        })
        .catch(err => console.log(err))    
} )         

router.post("/details/:student_id/setRole/:role", isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const {student_id, role} = req.params

    User
        .findByIdAndUpdate(student_id, {role})
        .then(() => {
            // res.send(student)
            res.redirect(`/students/details/${student_id}`)
        })
        .catch(err => console.log(err))
})


router.post("/details/:student_id/edit", isLoggedIn, checkRoles ('PM', 'STUDENT'), (req, res, next) => {              
    
    const {username, email, profileImg, description} = req.body
    const { student_id } = req.params
    
    User
        .findByIdAndUpdate(student_id, {username, email, profileImg, description})
        .then(() => {
        // res.send(student)
            res.redirect(`/students/details/${student_id}`)
        })
        .catch(err => console.log(err))    
})         

router.post("/list/:student_id/delete", isLoggedIn, checkRoles ('PM'), (req, res, next) => {
    
    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => {
        res.redirect('/students/list')
        })
        .catch(err => console.log(err))
})


module.exports = router
