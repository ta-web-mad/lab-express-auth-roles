const router = require("express").Router()
const {isLoggedIn, checkRoles} = require ("../middlewares")
const User = require('../models/User.model')
const { isPM } = require("../utils")

router.get('/', isLoggedIn,(req, res) => {
    User
        .find({role: 'STUDENT'})
        .select('username')
        .then((students) => res.render('students/students', {students}))
        .catch(err => console.log(err))
});

router.get("/:id", isLoggedIn,(req, res) => {
    const { id } = req.params

    User
    .findById(id)
    .then((student) => {
        res.render('students/students-profile', {
        student,
        isPM: isPM(req.session.currentUser)
        })
    })
    .catch(err => console.log(err))
});

router.post("/borrar/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params
  
    User.findByIdAndDelete(id)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))

    })

    router.get("/editar/:id", checkRoles("PM"), (req, res) => {
        const { id } = req.params
      
        User
        .findById(id)
        .then((student) => {
            res.render("students/students-edit", {
                student, 
                isPM: isPM(req.session.currentUser?.role === 'PM')
            })
        })
        .catch(err => console.log(err))
    
        })

        router.post("/editar/:id", checkRoles("PM"), (req, res) => {
            const { id } = req.params
            const { username, name, profileImg, description, role } = req.body
          
            User
              .findByIdAndUpdate(id, { username, name, profileImg, description, role }, { new: true })
              .then(student => res.redirect(`/students/${student._id}`))
              .catch(err => console.log(err))
          })

          router.post('/roleTA/:id', isLoggedIn, checkRoles('PM'), (req, res)=>{
              const { id } = req.params
            User
            .findByIdAndUpdate(id, {role: 'TA'})
            .then(() => res.redirect(`/students/${req.params.id}`))
            .catch(err => console.log(err))
    
        })
        
        router.post('/roleDEV/:id', isLoggedIn, checkRoles('PM'), (req, res)=>{
            const { id } = req.params
            User
            .findByIdAndUpdate(id, {role: 'DEV'})
            .then(() => res.redirect(`/students/${req.params.id}`))
            .catch(err => console.log(err))
        })

module.exports = router