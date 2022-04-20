const router = require("express").Router()

const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require("./../middlewares/route-guard")



router.get('/', isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(students => {
            res.render('students', { students })
        })
        .catch(err => console.log(err))
})



router.get('/students', isLoggedIn, (req, res) => {

    const isPM = req.session.currentUser.role === 'PM'



    User
        .find()
        .then(students => {
            console.log("students", students)
            res.render('students', { students, isPM })
        })
        .catch(err => console.log(err))


})




//Buscar student

router.get('/:id', (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(students => {
            res.render('students-details', students,)
        })
        .catch(err => console.log(err))
})


//Editar student

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(students => {
            // User
            //     .find()
            //     .then(students => {
            res.render('students-edit', { students })
        })
    // })
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { username, email, porfileImg, description, role } = req.body

    User
        .findByIdAndUpdate(id, { username, email, porfileImg, description, role })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})

//DELETE STUDENT

router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    User.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')

        })
        .catch(err => console.log(err))
})
module.exports = router