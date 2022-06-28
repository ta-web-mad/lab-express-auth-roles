const router = require("express").Router();
const User = require("../models/User.model")


const { isLoggedIn } = require('../middleware/session-guard')
const { checkRole } = require("../middleware/roles-checker")


router.get('/admin', isLoggedIn, checkRole('PM'), (req, res) => {

    res.render('pm/panel', { user: req.session.currentUser })
})

// Actualizar estudiante solo puede el PM

router.get('/student/:id/edit', checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User

        .findById(id)
        .then(student => {
            res.render('students/update-student', student)
        })
        .catch(err => console.log(err))

});

router.post('/student/:id/edit', checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    const { email, userPDW, username, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { email, userPDW, username, profileImg, description })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))

});

// Borrar estudiante solo puede el PM

router.get('/student/:id/delete', checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {

            res.redirect('/students')
        })
        .catch(err => console.log(err))

})

// Hacer estudiante DEV 

router.get('/student/:id/upgrade', checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    const { role } = req.body

    User

        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(student => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
});

// Hacer estudiante DEV 

router.get('/student/:id/upgradeTa', checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    const { role } = req.body

    User

        .findByIdAndUpdate(id, { role: 'TA' })
        .then(student => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
});



module.exports = router