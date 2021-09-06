const router = require("express").Router()
const User = require("../models/User.model")
const Course = require("../models/Course.model")
const { isLoggedIn, checkRoles } = require("./../middleware")


// Courses list
router.get("/", isLoggedIn, checkRoles('TA'), (req, res, next) => {

  Course
    .find()
    .then(courses => res.render("courses/courses", { courses }))
    .catch(err => console.log(err))
})


// Create new course: rendering
router.get('/create', isLoggedIn, checkRoles('TA'), (req, res) => {

  const tas = []
  const devs = []
  const students = []

  User
    .find()
    .then(users => {

      users.forEach(user => {
        if (user.role === 'DEV') devs.push(user)
        else if (user.role === 'TA') tas.push(user)
        else if (user.role === 'STUDENT') students.push(user)
      });

      res.render("courses/create-course", { tas, devs, students })
    })
    .catch(err => console.log(err))
})


// Create new course: management
router.post('/create', isLoggedIn, checkRoles('TA'), (req, res) => {

  const { title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students } = req.body

  Course
    .create({ title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students })
    .then(() => res.redirect('/courses'))
    .catch(err => console.log(err))
})


// Course details
router.get('/:id', isLoggedIn, checkRoles('TA'), (req, res) => {

  const { id } = req.params

  Course
  .findById(id)
  .populate('ta leadTeacher students')
  .then(course => {
    res.render('courses/course-details', { course })
  })
  .catch(err => console.log(err))
})


// Delete course
router.post('/:id/delete', isLoggedIn, checkRoles('TA'), (req, res) => {

  const { id } = req.params

  Course
    .findByIdAndRemove(id)
    .then(() => res.redirect('/courses'))
    .catch(err => console.log(err))
})


// Edit course: rendering
router.get('/:id/edit', isLoggedIn, checkRoles('TA'), (req, res) => {

  const { id } = req.params
  const users = User.find()
  const course = Course.findById(id)
  const tas = []
  const devs = []
  const students = []

  Promise.all([users, course]).then(data => {
    const [ users, course ] = data

    users.forEach(user => {
      if (user.role === 'DEV') devs.push(user)
      else if (user.role === 'TA') tas.push(user)
      else if (user.role === 'STUDENT') students.push(user)
    });

    res.render('courses/edit-course', { tas, devs, students, course })

  })
  .catch(err => console.log(err))

})


// Edit course: management
router.post('/:id/edit', isLoggedIn, checkRoles('TA'), (req, res) => {

  const { id } = req.params
  const { title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students } = req.body

  Course.
    findByIdAndUpdate(id, { title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students }, { new: true })
    .then(() => res.redirect('/courses'))
    .catch(err => console.log(err))

})

module.exports = router
