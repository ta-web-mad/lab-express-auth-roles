const router = require("express").Router()
const Course = require('./../models/Course.model')
const User = require('./../models/User.model')
const { checkRole } = require('./../middleware/route.guard')
const { isLoggedIn } = require('./../middleware/route.guard')



router.get('/CreateCourses', isLoggedIn, checkRole('TA'), (req, res, next) => {

    User
        .find({ $or: [{ role: 'DEV' }, { role: 'TA' }] })
        .then(allUser => {
            const devUser = allUser.filter(eachUser => {
                if (eachUser.role === 'DEV') {
                    return eachUser
                }
            })
            const taUser = allUser.filter(eachUser => {
                if (eachUser.role === 'TA') {
                    return eachUser
                }
            })
            res.render('courses/create-course-page', { devUser, taUser })

        })
        .catch(error => next(error))

})
router.post('/CreateCourses', (req, res, next) => {
    const { title, leadTeacher, startDate, ta } = req.body
    Course
        .create({ title, leadTeacher, startDate, ta })
        .then(() => { res.redirect('/Courses') })
        .catch(error => next(error))

})
router.get('/Courses', (req, res, next) => {

    Course
        .find()
        .populate('leadTeacher')
        .populate('ta')
        .then(allCourse => {
            res.render('courses/courses-page', { allCourse })
        })
        .catch(error => next(error))


})
module.exports = router