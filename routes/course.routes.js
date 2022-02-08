const { logueado, checkRole } = require("../middleware/route-ward")
const User = require("../models/User.model")

const router = require("express").Router()

router.get('/course',logueado, checkRole('TA'),  (req, res, next) => {
    
    User
        .find()
        .then(users => res.render('course/create', {users}) )
        .catch(error => next(error))

    
    
})

router.post('/course', logueado, checkRole('TA'), (req, res, next) =>{
    res.redirect('https://cutt.ly/AOV18LS')
})



module.exports = router

