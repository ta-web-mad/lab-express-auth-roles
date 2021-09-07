const router = require("express").Router()
const { checkId } = require('./../middleware')


router.get('/', checkId, (req, res) => {
    User
        .find()
        .then(students => res.render('students/students-list',
            { students, isLogged: req.session.currentUser }))
        .catch(err => console.log(err))
})


// CADA ALUMNO PUEDE EDITAR SU PERFIL

router.get('/editar/:user_id', checkId, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(theUser => res.render(`students/student-edit`, theUser))
        .catch(err => console.log(err))
})


router.post('/editar/:user_id', checkId, (req, res) => {

    const { user_id } = req.params
    const { username, description } = req.body

    User
        .findByIdAndUpdate(user_id, { username, description }, { new: true })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})


module.exports = router