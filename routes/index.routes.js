const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/route-guard')
const {checkRole} = require('./../middleware/route-guard')
const { checkMyProfile } = require('./../middleware/route-guard')


router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/students', (req, res) => {
  
  User
  .find()
  .then(users => res.render ('user/student-list', {users}))
  .catch(err => console.log(err))
})

router.get('/detalle-perfil/:user_id', isLoggedIn, (req, res) => {       //si lo que quiero es que no vea la vista, tengo que poner aqui el checkRole(PM)
                                                                            //porque sino aunque no vea el boton puede copiar la url y palante
  const { user_id } = req.params
 
  User
  .findById(user_id)
  .then(user => res.render('user/details',
  {
    user : user,                                          //esto lo hago porque solo le puedo pasar un objeto, por eso 
    isPm: req.session.currentUser.role === 'PM',
    isOwner: req.session.currentUser._id === user_id           //luego en la vista details lo llamo como user.username, otra opcion
  }                                                        //sería hacer un each en la vista y poner solo username en la vista
   ))
  .catch(err => console.log(err))
})


router.get('/editar-perfil/:user_id', isLoggedIn, checkRole('PM'), (req, res) =>{

  const { user_id } = req.params
  //checkMyProfile(req.params) 
  User
  .findById(user_id)
  .then(user => res.render('user/edit', user))
  .catch(err => console.log(err))

})

router.post('/editar-perfil/:user_id', isLoggedIn, (req, res) => {
  const { username, email, profileImg, description } = req.body
  const { user_id } = req.params

  checkMyProfile(req.params)               //no funciona :(
  User
  
  .findByIdAndUpdate(user_id, { username, email, profileImg, description } )
  .then(() => res.redirect(`/detalle-perfil/${user_id}`))
  .catch(err => console.log(err))

} )


router.post('/eliminar/:user_id',isLoggedIn, (req, res) => {
  
  const { user_id } = req.params
  console.log(req.params)

  User
  .findByIdAndDelete(user_id)
  .then(() => res.redirect('/students'))
  .catch(err => console.log(err))

} )

router.post('/convertirTA/:user_id', isLoggedIn, checkRole('PM'), (req, res) =>{
  
  const { user_id } = req.params

  User
  .findByIdAndUpdate(
    user_id,
    {role: 'TA'}
  )
  
  .then(() => res.redirect('/students'))
  .catch(err => console.log(err))
})

router.post('/convertirDEV/:user_id', isLoggedIn, checkRole('PM'), (req, res) =>{
  
  const { user_id } = req.params

  User
  .findByIdAndUpdate(
    user_id,
    {role: 'DEV'}
  )
  
  .then(() => res.redirect('/students'))
  .catch(err => console.log(err))
})




module.exports = router
