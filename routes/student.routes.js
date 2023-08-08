const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn } = require('../middlewares/route-ward');
const { checkRoles } = require('../middlewares/roles')

///////////////////////////LISTA ALUMNOS/////////////////////////////////////////////////////
router.get('/listado-alumnos', isLoggedIn, (req, res) => {

    User
        .find({ role: 'ESTUDIANTE' })
        .then(users => res.render('user/student-list', { users }))
        .catch(err => console.log(err))
})


///////////////////////////DETALLES ALUMNOS/////////////////////////////////////////////////////
router.get('/alumnos/detalles/:user_id', isLoggedIn, (req, res) => {

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM',
    }

    const currentUserID = req.session.currentUser._id
    const { user_id } = req.params
    const isCurrentUser = currentUserID === user_id;

    User
        .findById(user_id)
        .then(user => res.render('user/profile', { user, userRoles, isCurrentUser }))
        .catch(err => console.log(err))

})


///////////////////////////EDITAR ALUMNOS/////////////////////////////////////////////////////
router.get("/editar/:user_id", isLoggedIn, checkRoles('PM', 'ESTUDIANTE'), (req, res) => {

    const { user_id } = req.params

    const pmRole = {
        isPM: req.session.currentUser.role === 'PM',
    }
    const idOwner = {
        isOwner: req.session.currentUser._id === user_id
    }

    if (pmRole.isPM || idOwner.isOwner) {

        User
            .findById(user_id)
            .then(user => res.render("user/edit", user))
            .catch(err => console.log(err))
    } else {
        res.redirect('/')
    }
})


router.post("/editar/:user_id", isLoggedIn, checkRoles('PM', 'ESTUDIANTE'), (req, res) => {

    const { user_id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description, role })
        .then(user => res.redirect('/listado-alumnos'))
        .catch(err => console.log(err))
})


///////////////////////////BORRAR ALUMNOS/////////////////////////////////////////////////////

router.post("/eliminar/:user_id", isLoggedIn, checkRoles('PM'), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/listado-alumnos'))
        .catch(err => console.log(err))

})


///////////////////////////ASCENDER A DESARROLLADOR///////////////////////////////////////////////

router.post("/ascenderDesarrollador/:user_id", isLoggedIn, checkRoles('PM'), (req, res) => {


    const { user_id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(user_id, { role })
        .then(() => res.redirect('/listado-alumnos'))
        .catch(err => console.log(err))

})


///////////////////////////ASCENDER A TA/////////////////////////////////////////////////////

router.post("/ascenderTA/:user_id", isLoggedIn, checkRoles('PM'), (req, res) => {

    const { user_id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(user_id, { role })
        .then(() => res.redirect('/listado-alumnos'))
        .catch(err => console.log(err))

})

//////////////////////////////////////////////////////////////////

module.exports = router