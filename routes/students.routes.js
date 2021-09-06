const router = require("express").Router()
const User = require('./../models/User.model')

const { checkId, isLoggedIn, checkRoles } = require("../middleware")

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/students/editar/:id', isLoggedIn, checkRoles('PM'), (req, res) => {

  const {id} = req.params

  User
    .findById(id)
    .then(theStudents => res.render('students/student-editar', theStudents))
    .catch(err => console.log(err))

})

router.post('/students/editar/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  const { username, role} = req.body

  User
    .findByIdAndUpdate(id, { username, role}, { new: true })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


router.get('/students/delete/:id', isLoggedIn, checkRoles('PM'), (req, res) => {

  const {id} = req.params

  User
    .findById(id)
    .then(theStudents => res.render('students/student-delete', theStudents))
    .catch(err => console.log(err))
})

router.post('/students/delete/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  

  User
    .findByIdAndRemove(id,  { new: true })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


router.get("/students/:id", checkId, (req,res,next)=>{
  const { id } = req.params
  
  User
   .findById(id)
   .select()
   .then(theStudents => res.render("./../views/students/student-perfil.hbs", theStudents))
   
})

router.get("/estudiantes", isLoggedIn, (req, res, next) => {

    User
    .find()  
    .select() 
    .then(theStudents => {
      const options = {theStudents, isLogged: req.session.currentUser, isPM: req.session.currentUser?.role === 'PM'}

      console.log('TOMA EL CONTROL ---->', options)

      res.render('./../views/students/student.hbs', options)
    })
    .catch(err => console.log(err))

})

router.get('/students/desarrollador/:id', isLoggedIn, checkRoles('PM'), (req, res) => {

  const {id} = req.params

  User
    .findById(id)
    .then(theStudents => res.render('./../views/students/desarrollador', theStudents))
    .catch(err => console.log(err))

})

router.post('/students/desarrollador/:id', isLoggedIn, (req, res) => {
  const { id } = req.params
  const {role} = req.params
  

  User
    .findByIdAndUpdate(id, {role}, { new: true })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router