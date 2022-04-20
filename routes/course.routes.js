const router = require("express").Router()

const Course = require('../models/Course.model')
const User = require('../models/User.model')

const { checkRole } = require('../middleware/route-guard')

router.get('/courses', (req,res) => {

    const isTA = req.session.currentUser.role === 'TA'

    Course
        .find()
        .then(courses => {
            res.render('course/courses', {courses, isTA})
        })
})

router.get('/courses/create', (req, res, next) => {
    res.render('course/createcourse')
  })
  
router.post('/courses/create', (req, res, next) => {
    const {title} = req.body

    Course
        .create({title})
        .then(newCourse => {
        res.redirect(`/courses`)
        })
        .catch(err => console.log(err))
})

router.get('/courses/:id/edit', (req, res, next) => {
    const {id} = req.params
  
    Course
      .findById(id)
      .then(updatedCourse => {
        res.render('course/editarcurso',updatedCourse)
      })
      .catch(err => console.log(err))
  });
  
  router.post('/courses/:id/edit', (req, res, next) => {
    const {id} = req.params
    const {title} = req.body
  
    Course
      .findByIdAndUpdate(id,{title})
      .then (updatedCourse => {
          res.redirect(`/courses`)
      })
      .catch(err => console.log(err))
})

router.post('/courses/:id/delete', (req, res, next) => {
    const {id} = req.params
  
    Course
      .findByIdAndDelete(id)
      .then (deletedCourse => {
        res.redirect(`/courses`)
      })
      .catch(err => console.log(err))
  });
  

module.exports = router