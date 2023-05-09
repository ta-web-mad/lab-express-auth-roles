const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const router = express.Router()
const User = require('../models/User.model')

// profile page
router.get("/perfil", isLoggedIn, (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser })
})


// admin page (PROTECTED & ROLE BASED ACCESS)
// router.get("/admin", isLoggedIn, checkRoles('DEV', 'TA', 'PM'), (req, res, next) => {
//     res.render("user/admin-page")
// })

//ESTA ES LA LISTA
router.get('/students', (req, res, next) => {
    User
        .find()
        .then(students => res.render('students/students', { students }))
        .catch((error) => {
            console.log(error);
        });
});

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    console.log(req.session.currentUser)
    let isPM = false
    if (req.session.currentUser.role === 'PM') {
        isPM = true;
    }
    //Busco el estudiante or su id
    User
        .findById(id)
        .then((student) => {
            if (!student) {
                // Si no se encuentra al estudiante, entro aquí
                res.status(404).send('Student not found');
            } else {
                res.render('students/students-detail', { student, isPM });
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then((student) => {
            if (!student) {
                // Si no se encuentra al estudiante, entro aquí
                res.status(404).send('Student not found');
            } else {
                res.render('students/students-edit', student );
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    const { username, role } = req.body

    User
        .findByIdAndUpdate(id, { username, role })
        .then(() => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router
