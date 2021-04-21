const { response } = require('express')
const express = require('express')
const { findById } = require('../models/user.model')
const User = require('../models/user.model')
const router = express.Router()

const { checkRoles, isLoggedIn} = require('./../middlewares')

const {isBoss} = require('./../utils')




router.get('/', isLoggedIn, (req, res) =>{
    User
    .find()
    .then(allUsers =>{
        console.log('vamosssssssssss ESTOS SON TODOS LOS USUARIOS REGISTRADOS!!!!!!!!!!!!!!!!!!!!',allUsers)
        res.render('pages/student/index', {allUsers})
    })
    .catch(err => console.log('error', err))
    
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    
    
    
    User
    .findById(id)
    .then(userId => {
        console.log('este es el id de cada uno',userId);
        res.render('pages/student/show', userId)
    })
    .catch(err => console.log('error', err))
})


/*---------DELETE BUTTON----------*/

router.post('/delete/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(response => {
            res.render('pages/student/index', { response, isBoss: isBoss(req.session.currentUser) })
        })
        .catch(err => console.log('error', err))
})


module.exports = router