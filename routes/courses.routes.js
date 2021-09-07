const router = require("express").Router()
const routes = require(".")
const {
    isLogged,
    checkRoles
} = require("../middleware")
const Courses = require('./../models/Course.model')


router.get('/', (req, res) => {

    Courses
        .find()
        .then(() => res.render('courses/courses'))
        .catch(err => console.log('-----ERROR-----', err))

})

router.get('/create', (req, res) => {
    res.render('courses/create-course')
    //TODO
})

router.post('/create', (req, res) => {
    //TODO
})

router.get('/edit', (req, res) => {
    //TODO
})

router.post('/edit', (req, res) => {
    //TODO
})

router.post('/remove', (req, res) => {
    //TODO
})








module.exports = router