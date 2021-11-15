const User = require("../models/User.model");
const router = require("express").Router();
//Requerimos los middlewares que hemos creado 
const { isLoggedIn, checkRoles,} = require("../middleware");

//2.1 Generamos las vista de los estudiantes y comprovamos si el usuario esta logado atraves del middleware 'isLoggedIn'
router.get('/', isLoggedIn, (req, res) => {
    User
    .find()
    .select('username')
    .then(students => res.render('students/students', {students}))
    .catch(err => console.log(err))
});
//2.2 Comprovamos id del student para hacer render de su student-details
router.get('/:id', isLoggedIn, (req, res) => {
    const {id} = req.params
    User
    .findById(id)
    .then(student => res.render('students/student-details', 
    {student, isPM: req.session.currentUser?.role === "PM"}))
    .catch(err => console.log(err))

});

// 2.3 Comprovamos el ROLE PM que tiene para permitir edicion del student
router.get('/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id } = req.params
    User
    .findById(id)
    .then(student => res.render('students/student-edit', 
    {student, isPM: req.session.currentUser?.role === "PM"}))
    .catch(err => console.log(err))
});

//2.3.1 Actuaalizamos el student-details
router.post('/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id, username, role } = req.body
    User
    .findByIdAndUpdate(id, {username, role})
    .then(res.redirect('/students'))
    .catch(err => console.log(err))
});

//2.3.1 borramos el student
router.get('/:id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id } = req.params
    User
    .findByIdAndDelete(id)
    .then(res.redirect('/students'))
    .catch(err => console.log(err))
});





module.exports = router