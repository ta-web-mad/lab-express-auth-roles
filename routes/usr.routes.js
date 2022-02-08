const router = require("express").Router()
const { logueado, checkRole } = require("../middleware/route-ward")
const User = require("../models/User.model")
const { userIsTA, userIsPM, userIsDEV, userIsSelf } = require("../utils")

router.get("/students", (req, res, next) => {
    
    User 
        .find()
        //.then(student => console.log(student))
        .then(student => res.render("user/students", {student}))
        .catch(error => next(error))
   
})

router.get("/student-profile/:id", logueado, (req, res, next) => {
    const {id} = req.params

    const isPM = userIsPM(req.session.currentUser)
    const isSelf = userIsSelf(req.session.currentUser._id,id )

    //console.log(req.session.currentUser,id, isSelf)
    
    User 
        .findById(id)
        //.then(student => console.log(student))
        .then(student => res.render("user/student-profile", {student, isPM, isSelf}))
        .catch(error => next(error))

})

router.get("/editar/:id", logueado, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User 
        .findById(id)
        .then(student=> res.render('user/editar', student))
        .catch(error => next(error))

})

router.post("/editar/:id", logueado, checkRole('PM'), (req, res, next) =>{
    const {id} = req.params
    const {username, email, profileImg, description} = req.body
    

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description }, {new:true} )
        .then(updated => console.log(updated))
        .then(res.redirect(`/student-profile/${id}`))
        .catch(error => next(error))


})

router.post("/borrar/:id", logueado, checkRole('PM'), (req, res, next) => {

    const {id} =req.params

    User    
        .findByIdAndDelete(id)
        .then(res.redirect("/students"))
        .catch(error => next(error))

})

router.post("/upgrade/:id/ta", logueado, checkRole('PM'), (req, res, next) => {

    const {id} = req.params
    //res.send(id)

    User 
        .findByIdAndUpdate(id, {role:'TA'}, {new:true})
        .then(updated => console.log(updated))
        .then(res.redirect(`/student-profile/${id}`))
        .catch(error => next(error))

    
})

router.post("/upgrade/:id/dev", logueado, checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    //res.send(id)

    User
        .findByIdAndUpdate(id, { role: 'DEV' }, { new: true })
        .then(updated => console.log(updated))
        .then(res.redirect(`/student-profile/${id}`))
        .catch(error => next(error))


})








module.exports = router
