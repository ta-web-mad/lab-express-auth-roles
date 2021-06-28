const router = require("express").Router();

const User = require("../models/User.model") // REQUIERO EL MODELO

const { checkLoggedUser, checkRoles } = require('./../middleware')

// LISTADO DE ESTUDIANTES
router.get('/', (req, res) => {

    User
        .find()
        .select('username')
        .then(user => res.render('students/students', { user }))
        .catch(err => console.log(err))
})

//RUTA PARA CREAR ESTUDIANTES

router.get('/create', (req, res, next) => {
    res.render('students/new-students');
})

router.post('/create', (req, res, next) => {
    const { username, password } = req.body;

    User
        .create(req.body)
        .then(() => res.redirect('/students'))
        .catch(() => res.render('students/new-students',
            { errorMessage: 'no se puede crear estudiante' }))
})

// DETALLES DE USUARIO
router.post('/students-detail/:user_id', (req, res) => {

    const { user_id } = req.params

    const isPM = req.session.currentUser?.role === 'PM'

    User
        .findById(user_id)
        .then(user => res.render('students/students-details', { user, isPM }))
        .catch(err => console.log(err))
})

router.get("/", checkLoggedUser, (req, res, next) => {
    const isPM = req.session.currentUser.role === 'PM';

    User
        .find()
        .then(user => res.render('students/students', { user, isPM }))
        .catch(err => console.error(err));
});

module.exports = router