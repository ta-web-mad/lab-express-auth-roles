const router = require("express").Router()

const {  checkId, isLoggedIn, checkRoles  } = require('./../middleware')

const User = require("../models/User.model")

//listado de estudiantes
router.get("/", (req, res) => {

  User
    .find({ role: 'STUDENT' })
    .then(students => res.render('students', { students }))
    .catch(err => console.log(err))
})

// Formulario de edición: renderizado

router.get('/:id/edit', isLoggedIn, checkRoles('PM','STUDENT'), (req, res) => {  // revisar!!

  const { id } = req.params

  User
    .findById(id)
    .then(theStudent => res.render('students-edit', theStudent))
    .catch(err => console.log(err))
})



// Formulario de edición: gestión

router.post('/:id/edit', (req, res) => {

  const { id } = req.params
  const { username, name, profileImg, description, role } = req.body

  console.log(id, username, name, profileImg, description, role)

  User
    .findByIdAndUpdate(id, { username, name, profileImg, description, role }, { new: true })
    .then(theUser => res.redirect(`/students/${id}/edit`))
    .catch(err => console.log(err))
})


// perfil del estudiante

router.get('/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  console.log('devuelve =====>', id)
  User
    .findById(id)
    .then(theStudent => res.render('students-profile', theStudent))
    .catch(err => console.log(err))

})


//borrar estudiante

router.get('/:id/delete',checkRoles('PM'),(req,res)=>{
  console.log(req.params.id)
  res.send('delete')
  const{id}=req.params

  User
    .findById(id)
    .then(theStudent => res.render('students-edit', theStudent))
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

  const { id } = req.params
  const { username, name, profileImg, description, role } = req.body

  console.log(id, username, name, profileImg, description, role)

  User
    // .deleteById (id)
    // .then(theUser => res.redirect('students'))
    // .catch(err => console.log(err))
})



module.exports = router