const router = require("express").Router()

const Course = require('./../models/Course.model')


router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/cursos', (req, res, next) => {

  const isTA = req.session.currentUser.role === 'TA'

  Course
    .find()
    .then(allCourses => {
      res.render("courses", { allCourses, isTA })
    })
    .catch(err => console.log(err))
})



module.exports = router
