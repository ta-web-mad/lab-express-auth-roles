const router = require("express").Router()
const Course = require("./../models/Course.model")
const { isLoggedIn, moreThanTAPrivileges, IsUserPMM } = require('./../middlewares/route-guard')
const User = require("../models/User.model")
const {isMoreThanTaRole} = require('../utils')

router.get("/",isLoggedIn, (req, res, next) => {
    Course
     .find()
     .then(allCourses =>  res.render("./courses/index", {allCourses,  isMoreThanTaRole:isMoreThanTaRole(req.session.currentUser.role)}))
     .catch(err=>next(err))
  })
  
  router.post("/createNew", moreThanTAPrivileges, (req, res, next) => {
    User.find().then(users => {
        res.render('./courses/create', {users})
    })
     .catch(err=>next(err))
  })


  router.post("/create", (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body
    Course
     .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
     .then(()=>res.redirect('/courses'))
     .catch(err => next(err))
  })

  router.post("/:id/edit", moreThanTAPrivileges, (req, res, next) => {
    const findCourseById = Course.findById(req.params.id)
    const getUsers = User.find()
    const getTAs = User.find({role:"TA"})
    const getUsersRoleStudents = User.find({role:'STUDENT'})
    Promise.all([findCourseById, getUsers, getTAs, getUsersRoleStudents])
    .then(everything => {
      console.log(typeof(everything[3][0]))
        res.render('./courses/edit', {everything})
    })
     .catch(err=>next(err))
  })

  router.get("/:id/details", (req, res, next) => {
    Course
    .findById(req.params.id)
    .populate('ta')
    .then(course=>{console.log(course)
      res.render('./courses/details', course)})
      .catch(err => next(err))
    })


    router.post("/:id/delete", moreThanTAPrivileges, (req, res, next) => {
      Course
       .findByIdAndDelete(req.params.id)
       .then(()=>res.redirect('/courses'))
       .catch(err => next(err))
    })

module.exports = router