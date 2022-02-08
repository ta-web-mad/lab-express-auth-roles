const CourseModel = require("../models/Course.model")
const { isLoggedIn, isTA } = require("../middleware/route.guard");




const router = require("express").Router()




router.get('/courses', isTA, async (req, res, next) => {
    const allCourses = await CourseModel.find()




    res.render('../views/courses/courses', { allCourses })
})


router.get('/courses/create', async (req, res, next) => {
    res.render('../views/courses/create')
})


router.post('/courses/create', async (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, courseImg, description } = req.body

    const newCourse = await CourseModel.create({ title, leadTeacher, startDate, endDate, courseImg, description })



    res.redirect('/courses')
})




module.exports = router