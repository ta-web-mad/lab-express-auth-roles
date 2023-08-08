const express = require('express');
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');
const router = express.Router();
const User = require('../models/User.model')

router.get('/students', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then((students) => {
            res.render('student/students', { students });
        })
        .catch(error => next(error))

})

router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM'
    }

    const { id } = req.params;
    User
        .findById(id)
        .then(student => {
            res.render('student/details', { student, userRoles });
        })
        .catch(error => next(error));
});

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM'
    }

    User.findById(id)
        .then(student => {
            res.render('student/details', { student, userRoles });
        })
        .catch(error => next(error));
});

router.post('/students/:id/edit', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params;
    const { newInfo } = req.body;

    User.findByIdAndUpdate(id, { info: newInfo }, { new: true })
        .then(student => {
            res.redirect(`/students/${id}`);
        })
        .catch(error => next(error));
});

module.exports = router;
