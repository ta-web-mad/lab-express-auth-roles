const { isLoggedIn, isAuthorized } = require("../middlewares/route-guard")
const checkRole = require("../utils/checkRole")
const router = require("express").Router()
const User = require('../models/User.model')
const Course = require('../models/Course.model')


router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const courses = await Course.find()
        res.render('courses/courses-list', { role: checkRole(req.session.currentUser), courses })

    } catch (err) {
        next(err)
    }
})

router.get('/create', isLoggedIn, isAuthorized("TA", "PM"), async (req, res, next) => {
    try {

        const ta = await User.find({ role: "TA" })
        const leadTeacher = await User.find({ role: "DEV" })
        const students = await User.find({ role: "STUDENT" })
        res.render("courses/courses-create", { role: checkRole(req.session.currentUser), ta, leadTeacher, students })
    }
    catch (err) {
        next(err)
    }
})

router.post("/create", isLoggedIn, isAuthorized("TA", "PM"), async (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students } = req.body
    try {

        await Course.create({ title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students })
        res.redirect("/courses")

    } catch (err) {
        next(err)

    }
})

router.get('/:id', isLoggedIn, async (req, res, next) => {
    const { id } = req.params
    try {
        const course = await
            Course
                .findById(id)
                .populate([
                    {
                        path: "ta",
                        select: '-_id username'
                    },
                    {
                        path: "leadTeacher",
                        select: '-_id username'
                    }])
        res.render('courses/course-details', { role: checkRole(req.session.currentUser), course })

    } catch (err) {
        next(err)
    }
})

router.get('/:id/edit', isLoggedIn, isAuthorized("TA", "PM"), async (req, res, next) => {
    const { id } = req.params
    try {
        const leadTeacher = await User.find({ role: "DEV" })
        const students = await User.find({ role: "STUDENT" })
        const ta = await User.find({ role: "TA" })
        const course = await
            Course
                .findById(id)
                .populate([
                    {
                        path: "ta",
                        select: '-_id username'
                    },
                    {
                        path: "leadTeacher",
                        select: '-_id username'
                    }])
        res.render('courses/course-edit', { role: checkRole(req.session.currentUser), course, leadTeacher, ta, students })

    } catch (err) {
        next(err)
    }
})
router.post('/:id/edit', isLoggedIn, isAuthorized("TA", "PM"), async (req, res, next) => {
    const { id } = req.params
    const { title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students } = req.body

    try {

        await Course
            .findByIdAndUpdate(id, { title, leadTeacher, startDate, endDate, ta, description, courseImg, status, students })
        res.redirect("/courses")

    } catch (err) {
        next(err)
    }

})


router.post("/:id/delete", isLoggedIn, isAuthorized("TA", "PM"), async (req, res, next) => {

    const { id } = req.params

    try {
        await Course.findByIdAndDelete(id)
        res.redirect("/courses")
    } catch (err) {
        next(err)
    }

})

module.exports = router
