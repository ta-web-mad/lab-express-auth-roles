const router = require('express').Router()
const Course = require('./../models/Course.model')
const { isLoggedIn } = require('./../middleware/route-guard')

router.get('/create', isLoggedIn, (req, res) => {
  res.render('courses/courses-form')
})
