const router = require('express').Router()
const { checkMongoID, isTA } = require('../utils')
const User = require('../models/User.model')
const Course = require('../models/Course.model')
const { isLoggedIn, checkRoles } = require('./../middlewares')

router.get('/', isLoggedIn, checkRoles('TA'), (req, res, next) => {
  Course.find()
    .then((courses) => res.render('courses/panel', { courses }))
    .catch((err) => console.error(err))
})

router.get('/add', isLoggedIn, checkRoles('TA'), (req, res, next) => {
  res.render('courses/add-course')
})

router.post('/add', isLoggedIn, checkRoles('TA'), (req, res, next) => {
  const { title, startDate, endDate, courseImg, desciption } = req.body
  Course.create({
    title,
    startDate,
    endDate,
    courseImg,
    desciption,
  })
    .then(() => res.redirect('/courses'))
    .catch((err) => console.error(err))
})

module.exports = router
