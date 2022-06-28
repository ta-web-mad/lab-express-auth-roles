const router = require("express").Router()

const Course = require("../models/Course.model")
const User = require("../models/User.model")

const parseDate = require("../utils/parse-date")
const checkMongoID = require("../utils/check-mongo-id")
const { isLoggedIn } = require("./../middleware/session-guard")

const { checkRole } = require("./../middleware/roles-checker")

const { rolesChecker } = require("./../utils/roles-checker")


router.get("/courses", isLoggedIn, (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser);
    console.log(roles)
    Course.find()
        .then(data => {


            const starts = data.map(course => parseDate(course.startDate));
            const ends = data.map(course => parseDate(course.endDate));
            const dataWithDates = []
            data.forEach((course, i) => {
                dataWithDates.push({
                    course,
                    date: { start: starts[i], end: ends[i] }
                })
            })
            console.log({ dataWithDates })
            res.render('courses/course-list', { dataWithDates, roles })
        })
        .catch()

})

router.get("/courses/:id", isLoggedIn, (req, res, next) => {
    if (!checkMongoID(req.params.id)) {
        res.render('index', { errorMessage: "Invalid ID" })
    }
    Course.findById(req.params.id)
        .populate('ta')
        .then(data => {
            res.render('courses/course-details', data)
        })
        .catch(err => console.log(err))

})

router.get("/courses/create", isLoggedIn, checkRole("TA"), (req, res, next) => {

    const findStudents = User.find({ role: "STUDENT" })
    const findDevs = User.find({ role: "DEV" })
    const findTA = User.find({ role: "TA" })

    Promise.all([findStudents, findDevs, findTA])
        .then(data => {

            res.render('courses/course-create', { students: data[0], devs: data[1], ta: data[2] })
        }).catch(err => res.render)

})

router.post("/courses/create", isLoggedIn, checkRole("TA"), (req, res, next) => {
    const newCourse = req.body
    Course.create(newCourse)
        .then(res.redirect('/courses'))
        .catch(err => res.render('courses/course-create', { errorMessage: err }))
})

router.get("/courses/:id/edit", isLoggedIn, checkRole("TA"), (req, res, next) => {
    const findStudents = User.find({ role: "STUDENT" })
    const findDevs = User.find({ role: "DEV" })
    const findTA = User.find({ role: "TA" })

    const old = Course.findById(req.params.id)

    Promise.all([findStudents, findDevs, findTA, old])
        .then(data => {
            const startDate = parseDate(data[3].startDate)
            const endDate = parseDate(data[3].endDate)

            res.render('courses/course-edit', { students: data[0], devs: data[1], ta: data[2], old: data[3], date: { start: startDate, end: endDate } })
        }).catch(err => console.log(err))
})

router.post("/courses/:id/edit", isLoggedIn, checkRole("TA"), (req, res, next) => {
    const newCourse = req.body
    Course.findByIdAndUpdate(req.params.id, newCourse)
        .then(res.redirect('/courses'))
        .catch(err => console.log(err))
})
router.post("/courses/:id/delete", isLoggedIn, checkRole("TA"), (req, res, next) => {
    const newCourse = req.body
    Course.findByIdAndDelete(req.params.id)
        .then(res.redirect('/courses'))
        .catch(err => console.log(err))
})

router.post("/courses/:id/add", isLoggedIn, checkRole("STUDENT"), (req, res, next) => {
    const newCourse = req.body
    Course.findByIdAndUpdate(req.params.id, { $push: { students: req.session.currentUser._id } })
        .then(res.redirect('/courses'))
        .catch(err => console.log(err))
})
module.exports = router
