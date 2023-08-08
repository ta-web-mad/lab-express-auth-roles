const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares/route-guard")
const User = require("../models/User.model")
const Course = require('../models/User.model')


router.get('/courses', isLoggedIn, checkRoles('TA'), (req, res, next) => {

    Course
        .find()
        .then(courses => res.render('courses/courses', courses))
        .catch(err => next(err))


})

router.get('/courses/create', isLoggedIn, checkRoles('TA'), (req, res, next) => {

    //promise.all

})



module.exports = router