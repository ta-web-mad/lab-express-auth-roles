const router = require("express").Router()
const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')

const Student = require('./../models/User.model')


// ----------> DELETE STUDENT <----------

router.post('/student/:id/delete', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params

    Student
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(error => next(error))
})


// ----------> EDIT STUDENT <----------

router.get('/student/:id/edit', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params

    Student
        .findById(id)
        .then(selectedStudent => {
            res.render('PM-limited/edit-student', selectedStudent)
        })
        .catch(error => next(error))
})


router.post('/student/:id/edit', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params
    const { email, username, description, profileImg } = req.body

    console.log(req.body)

    Student
        .findByIdAndUpdate(id, { email, username, description, profileImg })
        .then(() => {
            res.redirect('/students')
        })
        .catch(error => next(error))
})


// ----------> UPDATE ROLE <----------

router.get ('/student/:id/role', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params
    const { role } = req.query

    Student
        .findByIdAndUpdate(id, { role })
        .then(() => {
            res.redirect(`/student/${id}`)
        })
        .catch(error => next(error))
})






module.exports = router