const router = require("express").Router()

const { isLogged, checkRoles, checkOwnerOrPM} = require("../middlewares/route-guard")
const User = require('../models/User.model')

router.get("/students", isLogged, (req, res, next) => {

  User.find({ "role": { "$ne": "PM" } } )
  .then( userList => res.render("students/studentList" , {userList}))
  .catch(error => next(error))

})

router.get("/students/:id", isLogged, (req, res, next) => {

  const {id} = req.params

  const userRole = {
    isPM: req.session.currentUser?.role === 'PM',
    isProfile: req.session.currentUser?._id === id
  }

  User.findById(id)
  .then( user => res.render("students/studentDetails" , {user , userRole}))
  .catch(error => next(error))

})

// ------------------------------------------------------------------------------------------------------------------

router.get("/edit-student/:id", isLogged, checkOwnerOrPM, (req, res, next) => {

    const {id} = req.params

    const userRole = {
    isPM: req.session.currentUser?.role === 'PM',
  }

    User.findById(id)
    .then( user => res.render("students/editStudent" , {user , userRole}))
    .catch(error => next(error))

})

router.post('/edit-student/:id', isLogged, checkOwnerOrPM, (req, res, next) => {

    const {id} = req.params

    const { email , username , profileImg, description, role} = req.body

    User.findByIdAndUpdate(id, {email , username , profileImg, description, role})
    .then( () => res.redirect('/students'))
    .catch(error => next(error))

})


router.post('/delete-student/:id', isLogged, checkOwnerOrPM, (req, res, next) => {

    const {id} = req.params

    User.findByIdAndDelete(id)
    .then( () => res.redirect('/students'))
    .catch(error => next(error))

})

// ------------------------------------------------------------------------------------------------------------------


router.post('/changeToDev/:id', isLogged, checkRoles('PM'), (req, res, next) => {

    const {id} = req.params

    const newRole = "DEV"

    User.findByIdAndUpdate(id, {role: newRole})
    .then( () => res.redirect('/students'))
    .catch(error => next(error))

})

router.post('/changeToTA/:id', isLogged, checkRoles('PM'), (req, res, next) => {

    const {id} = req.params

    const newRole = "TA"

    User.findByIdAndUpdate(id, {role: newRole})
    .then( () => res.redirect('/students'))
    .catch(error => next(error))

})

router.get("/profile", isLogged, (req, res, next) => {
  res.render("students/studentDetails", { user: req.session.currentUser })
})


module.exports = router
