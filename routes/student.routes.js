const router = require('express').Router()

const { isLoggedIn, checkRoles } = require('../middleware')
const { userIsPM, userIsDEV} = require('../utils')

const User = require('../models/User.model')

//Listado de los estudiantes
router.get('/estudiantes', isLoggedIn, (req, res) => {

  User
  .find()
  .then(user =>  res.render('./student/list-student', { user }))
  .catch(err => console.log(err))
  
})

//Detalles del estudiante
router.get('/estudiantes/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  const isPM = userIsPM(req.session.currentUser)
  // console.log("este es el ID " + id)

  User
  .findById( id )
  .then(theStudent => res.render('./student/details-student', {theStudent, isPM}))
  .catch(err => console.log(err))

})

//Eliminar estudiantes
router.post('/estudiantes/:id/eliminar', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { id } = req.params
  console.log("hola buenas" + id)

  User
    .findByIdAndDelete(id)
    .then(() => res.redirect(`/estudiantes`))
    .catch(err => console.log('Hubo un error:', err))

})

//Editar Estudiantes

//renderizado del formulario que cambiar

router.get('/estudiantes/:id/editar', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { id } = req.params

  // res.send("hola buenas", id)

  console.log("no ARRIESGOOOOOOO _----- ", id)

  User
  .findById(id)
  .then(student => res.render('./student/edit-student', student))
  .catch(err => console.log(err))

})

//Envio de informacion del formulario
router.post('/estudiantes/:id/editar', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { id } = req.params
  console.log("hola que tal? tengo el control?", id)
  const { username, name, description, role } = req.body
  console.log({ username, name, description, role } )

  User
    .findByIdAndUpdate(id, { username, name, description, role }, { new: true })
    .then(theStudent => res.redirect(`/estudiantes/${theStudent._id}`))
    .catch(err => console.log(err))

})




module.exports = router