const router = require('express').Router()

const { isLoggedIn, checkRole } = require('./../middleware/route-guard')

const Student = require('../models/User.model');



router.get('/students', isLoggedIn, (req, res, next) => {


    Student
     .find({ role: { $ne: 'PM' } })
     .then((students)=> res.render('private/students', {students} ))
})


router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const isAdmin = req.session.currentUser.role === 'PM'
    const thisUser = req.session.currentUser._id === id

    Student
        .findById(id)
        .then(student => {
            res.render("private/student-details", {student, isAdmin, thisUser})
        })
        .catch(err => console.log(err))

})


//// EDIT N DELETE ////

router.get('/students/:id/edit', isLoggedIn, checkRole('PM','STUDENT'), (req, res, next) => {

    const { id } = req.params


    Student
        .findById(id)
        .then(student => {
            res.render('private/edit-student', student)
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', isLoggedIn, checkRole('PM','STUDENT'), (req, res, next) => {

    const { username, email, profileImg, description } = req.body
    const { id } = req.params
    

   Student
        .findByIdAndUpdate(id, { username, email, profileImg, description})
        .then(() => {
            res.redirect("/students")
        })
        .catch(err => {
            res.redirect(`/students/${id}`)
            console.log(err)
        })
})

      
router.post("/students/:id/delete", isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params;
    
   Student
        .findByIdAndDelete(id)
        .then(student => res.redirect("/students"))
        .catch((err) => console.log(err))
    })



 /// ROLE HANDLING ////
 
 router.post("/students/:id/role-to-ta", isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params;
    
   Student
        .findByIdAndUpdate(id, {role:'TA'})
        .then(student => res.redirect("/students"))
        .catch((err) => console.log(err))
    })


router.post("/students/:id/role-to-dev", isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params;
        
    Student
        .findByIdAndUpdate(id, {role:'DEV'})
        .then(student => res.redirect("/students"))
        .catch((err) => console.log(err))
    })







module.exports = router