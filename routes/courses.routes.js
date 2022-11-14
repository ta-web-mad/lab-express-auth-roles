const router = require("express").Router();
const { TA, DEV, STUDENT } = require("../const");
const CourseModel = require('../models/Course.model')
const UserModel = require('../models/User.model')

router.get('/', (req, res, next) => {
    CourseModel.find()
        .select('title startDate endDate status _id')
        .then((courses) => {
            res.render('courses/index', { courses })
        })
        .catch((err) => {
            console.log('Error encontrando los cursos')
            console.log(err)
            next(err)
        })
})

router.get('/create', async (req, res, next) => {
    if (req.app.locals.isTa) {
        try {
            const allstudents = await UserModel.find({ role: STUDENT }).select('username _id')
            const devs = await UserModel.find({ role: DEV }).select('username _id')
            const teachers = await UserModel.find({ role: TA }).select('username _id')
            res.render('courses/create-course', { allstudents, teachers, devs })

        } catch (err) {
            console.log(err)
            next(err)
        }
    } else {
        res.render('auth/login', { errorMessage: 'No tenes premiso weon' })
    }
})
router.get('/:id/delete', (req, res, next) => {
    if (req.app.locals.isTa) {
        CourseModel
            .findByIdAndDelete(req.params.id)
            .then((course) => {
                console.log('Course deleted')
                res.redirect('/courses')
            })
            .catch((err) => { next(err) })
    } else {
        res.render('auth/login', { errorMessage: 'No tenes premiso weon' })
    }
})

router.get('/:id/edit', async (req, res, next) => {
    if (req.app.locals.isTa) {
        try {
            const allstudents = await UserModel.find({ role: STUDENT }).select('username _id')
            const devs = await UserModel.find({ role: DEV }).select('username _id')
            const teachers = await UserModel.find({ role: TA }).select('username _id')
            const course = await CourseModel.findById(req.params.id)
            const { _id, title, leadTeacher, startDate, endDate, ta, courseImg, description, statusCreate, students } = course
            res.render('courses/course-edit', { _id, title, leadTeacher, startDate, endDate, ta, courseImg, description, statusCreate, students, allstudents, teachers, devs })

        } catch (err) {
            next(err)
        }
    } else {
        res.render('auth/login', { errorMessage: 'No tenes premiso weon' })
    }
})

// Check if the student is laready in the course

router.get('/:id/join', (req, res, next) => {
    CourseModel.updateOne({ _id: req.params.id }, { $addToSet: { students: req.session.currentUser._id } })
        .then((course) => {
            console.log("student added to the course")
            res.redirect('/courses')
        })
        .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
    CourseModel
        .findById(req.params.id)
        .populate('leadTeacher ta students')
        .then((course) => {
            console.log(course)
            res.render('courses/course-details', course)
        })
        .catch((err) => next(err))
})


router.post('/:id/edit', (req, res, next) => {
    // clean the req.body from empty arrays
    for (const key in req.body) {
        if (!req.body[key]) delete req.body[key]
    }
    let status
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, statusCreate, students } = req.body

    if (statusCreate) {
        status = 'ON'
    } else {
        status = 'OFF'
    }
    CourseModel
        .findByIdAndUpdate(req.params.id, { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then((course) => {
            console.log('Course created')
            res.redirect('/courses')
        })
        .catch((err) => { next(err) })
})

router.post('/create', (req, res, next) => {
    // clean the req.body from empty arrays
    for (const key in req.body) {
        if (!req.body[key]) delete req.body[key]
    }
    let status
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, statusCreate, students } = req.body
    if (statusCreate) {
        status = 'ON'
    } else {
        status = 'OFF'
    }
    CourseModel.create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then((course) => {
            console.log('Curso creado')
            res.redirect('/courses')
        })
        .catch((err) => {
            next(err)
        })
})


module.exports = router