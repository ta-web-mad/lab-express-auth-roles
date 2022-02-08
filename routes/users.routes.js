const router = require("express").Router()
// const bcrypt = require('bcryptjs')
const User = require("../models/User.model")

const { isLoggedIn, isPmLogged } = require('../middlewares/middlewares')
const { isPm, isCurrent } = require("../utils")

router.get('/students', isLoggedIn, (req, res, next) => {


    console.log('is pm????', isPm(req.session.currentUser))
    User
        .find()
        .then(users => {
             
            res.render('users/students', { users , isPm: isPm(req.session.currentUser)})
        })
        .catch(err => console.log(err))

})

router.get('/:id/profile', isLoggedIn,(req, res, next) => {
    const { id } = req.params
    console.log(id)
    // const current = isCurrent(user,req)||isPm(user)

    User
        .findById(id)
        .then(user => { 
            console.log(user)
            res.render('users/student-view', { user, current: (isCurrent(user, req) || isPm(req.session.currentUser))})
          })
        .catch(err => console.log(err))
    
})

router.get('/:id/edit', (req, res, next)=>{
    const { id } = req.params
    User
        .findById(id)
        .then(user => { res.render('users/edit',user)})
        .catch(err => console.log(err))    
})
router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    const {username,email} = req.body
    User
        .findByIdAndUpdate(id, { username, email },{new:true})
        .then(() => res.redirect('/user/students'))
        .catch(err => console.log(err))
})

router.post('/:id/delete', isPmLogged, (req, res, next)=>{
    const { id } = req.params
    User  
       .findByIdAndDelete(id)
       .then(()=>res.redirect('/user/students'))
       .catch(err => console.log(err))
})
router.post('/:id/becomeDev', isPmLogged, (req, res, next) => {
    const { id } = req.params
    const roles = 'DEV'
    User
        .findByIdAndUpdate(id,{roles},{new:true})
        .then(() => res.redirect('/user/students'))
        .catch(err => console.log(err))
})
router.post('/:id/becomeTa', isPmLogged, (req, res, next) => {
    const { id } = req.params
    const roles = 'TA'
    User
        .findByIdAndUpdate(id, { roles }, { new: true })
        .then(() => res.redirect('/user/students'))
        .catch(err => console.log(err))
})
router.post('/:id/becomeStudent', isPmLogged, (req, res, next) => {
    const { id } = req.params
    const roles = 'STUDENT'
    User
        .findByIdAndUpdate(id, { roles }, { new: true })
        .then(() => res.redirect('/user/students'))
        .catch(err => console.log(err))
})



module.exports = router