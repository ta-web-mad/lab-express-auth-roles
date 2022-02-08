const router = require("express").Router()
const User = require("../models/User.model")
const {isLoggedIn, checkRole} = require('../middleware/route-guard')
const {isPM, isOwn} = require('../utils')
const { findOneAndUpdate } = require("../models/User.model")

//Students routes
router.get("/", isLoggedIn, (req, res, next) => {
  User
  .find({role: 'STUDENT'})
  .then(students => res.render('students/students-list', { students }))
  .catch(err => next(err))
})


router.get('/:id', isLoggedIn, (req, res, next) => {
  const {id} = req.params
  
  User
  .findById(id)
  .then(user => res.render('students/students-details', {user, isPM: isPM(req.session.currentUser), isOwn: isOwn(id, req.session.currentUser._id)}))
  .catch(err => next(err))
})

router.get('/:id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {
  const {id} = req.params
  if(isOwn(id, req.session.currentUser._id) || isPM(req.session.currentUser)){

    User
    .findById(id)
    .then(studentToEdit => res.render('pm/edit-students', studentToEdit))
    .catch(err => next(err))
  }

})

router.post('/:id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {
  const {id} = req.params
  const {username, email, profileImg, description, role } = req.body
  if(isOwn || isPM) {

    User
    .findByIdAndUpdate(id, {username, email, profileImg, description, role }, {new: true})
    .then(() => res.redirect(`/students/${id}`))
    .catch(err => next(err))
  }
})

router.post('/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {
  const {id} = req.params
  User
  .findByIdAndDelete(id)
  .then(() => res.redirect('/students'))
  .catch(err => next(err))
  
})

router.get('/:id/make/:role', isLoggedIn, checkRole('PM'), (req, res, next) =>{
  const {id, role} = req.params

  User
  .findByIdAndUpdate(id, {role}, {new: true})
  .then(updatedUser => {
    console.log('updatedUser ==>',updatedUser)
    res.redirect(`/students/${id}`)})
  .catch(err => next(err))
})




module.exports = router
