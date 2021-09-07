const router = require("express").Router()

const User = require("../models/User.model")

const {isLogged, isPM} = require("../utils")

const { isLoggedIn, checkRoles } = require("../middleware")


//Students List
router.get('/', (req, res) => {
    
    User
    .find()
    .then(regUser => {
        res.render('students/students', { regUser, isLogged: isLogged(req.session.currentUser), isPM: isPM(req.session.currentUser?.role) })
    })
    .catch(err => console.log(err))
})

//Students Profile
router.get('/:id', isLoggedIn,  (req, res) => {
    
    const {id} = req.params

    User
    .findById(id)
    .then(student => {
        res.render('students/profile', { student, isLogged: true })
    })
    .catch(err => console.log(err))
})

//Student Edit Profile
router.get('/:id/edit', checkRoles('PM'), (req,res) => {

    const {id} = req.params

    User
    .findById(id)
    .then(profile => {
        res.render('students/edit',profile)
        
    })
    .catch(err => console.log(err))
})

router.post('/:id/edit', checkRoles('PM'), (req,res) => {
     
      const {id} = req.params

      const {username, profileImg, description } = req.body

      

    User
    .findByIdAndUpdate(id, {username, profileImg, description }, {new: true})
    .then(User => res.redirect('/'))
    .catch(err => console.log(err))
})

// Student Delete
 router.get(':id/delete', checkRoles('PM'), (req, res) => {
    
    const { id } = req.params

    User
    .findByIdAndRemove(id)
    .then(profile => res.redirect('/'))
    .catch(err => console.log(err))
})

// Role change
router.get('/students/:id/:DEV', checkRoles('PM'), (req, res) =>{
    const {id, cha_role} = req.params

    User
    .findByIdAndUpdate(id, {cha_role}, {new: true})
    .then(profile => res.redirect('/'))
    .catch(err => console.log(err))
})

 module.exports = router;