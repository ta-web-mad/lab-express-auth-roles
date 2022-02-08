const { logueado, checkRole } = require("../middleware/route-ward")
const User = require("../models/User.model")

const router = require("express").Router()

router.get('/course', logueado, checkRole('TA'), (req, res, next) => {
    const data = {}
    User
        .find()
        .then((users) => {
            data.users = users
            return User.find({ role: 'TA' })
        })
        .then(ta => {
            data.ta = ta
            console.log(data)
            res.render('course/create', { data }) })
        .catch(error => next(error))



})

router.post('/course', logueado, checkRole('TA'), (req, res, next) => {
    res.redirect('https://cutt.ly/AOV18LS')
})



module.exports = router

