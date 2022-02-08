const { logueado, checkRole } = require("../middleware/route-ward")

const router = require("express").Router()

router.get('/course',logueado, checkRole('TA'),  (req, res, next) => {
    res.render('course/create')
})

router.post('/course', logueado, checkRole('TA'), (req, res, next) =>{
    res.redirect('https://cutt.ly/AOV18LS')
})



module.exports = router

