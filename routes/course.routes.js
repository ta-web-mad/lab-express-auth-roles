const router = require("express").Router()
const Course = require("../models/Course.model")

//crearCurso
router.get('/crearCurso', (req, res) => {
    res.render('courses/createForm')
})

module.exports = router
