const router = require("express").Router();
const User = require('../models/User.model');
const { isLoggedIn, checkRoles, userId } = require('./../middleware');



// LISTA DE ESTUDIANTES
router.get ('/', isLoggedIn, (req, res) => {

    User
    .find()
    .then(users => res.render('students/', {users, isLogged: req.session.currentUser}))
    .catch(err => console.error(err))
}),


// DETALLES DE ESTUDIANTES
router.get ('/:id', isLoggedIn, userId, (req, res) => {

    User
    .findById(req.params.id)
    .then(user => res.render ('students/student-details', {user, isPM: req.session.currentUser?.role === 'PM', idUser: req.session.currentUser._id === req.params.id}))
    .catch(err => console.error(err))
}), 


// EDITAR ESTUDIANTE (GET)
router.get ('/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

    User
    .findById(req.params.id)
    .then(user => res.render('students/student-edit', user))
    .catch(err => console.error(err));
}),


// EDITAR ESTUDIANTE (POST)
router.post ('/:id/edit', isLoggedIn, userId, checkRoles('PM'), (req, res) => {

    const { username, name, description, role, profileImg} = req.body;

    User
    .findByIdAndUpdate(req.params.id, req.body) //req.session.currentUser.id === req.params.id
    .then(() => res.redirect('/students/' + req.params.id))
    .catch(err => console.error(err));
}),


// EDITAR PERFIL MEDIANTE BOTON (POST)
router.post('/:id/role-update', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    User
    .findByIdAndUpdate(req.params.id, req.query)
    .then(() => res.redirect('/students/' + req.params.id))
    .catch(err => console.error(err));
});


// BORRAR ESTUDIANTE (POST)
router.post('/:id/delete', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    User
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/students'))
    .catch(err => console.error(err));
});

module.exports = router
