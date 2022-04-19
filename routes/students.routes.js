const router = require("express").Router();
const { isLoggedIn, checkRole } = require("../middlewares/route-guard");
const User = require('./../models/User.model')


//LISTA ESTUDIANTES
router.get('/', isLoggedIn, (req, res) => {

    User
        .find()
        .then(students => {
            res.render('students', { students })
        })
        .catch(err => console.log(err))
})


//DETALLES ESTUDIANTES
router.get('/:id', isLoggedIn, (req, res) => {
    const { id } = req.params

    const isPM = req.session.currentUser.role === 'PM'
    const isSameID = req.session.currentUser._id === req.params.id

    User
        .findById(id)
        .then(students => {
            res.render("student-profile", { students, isPM, isSameID })
        })
        .catch(err => console.log(err))
})


// BORRAR ESTUDIANTES 
router.post('/:id/delete', (req, res) => {
    const { id } = req.params


    User
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})



//EDITAR ESTUDIANTES
router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(() => {
            res.render("student-edit")
        })
        .catch(err => console.log(err))

})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { username, email, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, description })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})

//HACER TA Y DEV

router.post('/:id/edit/TA', isLoggedIn, checkRole("PM"), (req, res) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: "TA" })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})


router.post('/:id/edit/DEV', isLoggedIn, checkRole("PM"), (req, res) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: "DEV" })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})

module.exports = router;