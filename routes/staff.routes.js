const express = require('express');
const { isLoggedIn, } = require('../middlewares/route-guard');
const router = express.Router();

const Staff = require('./../models/User.model')


router.get('/staff', isLoggedIn, (req, res, next) => {
    Staff
        .find({
            $or: [
                { role: 'TA' },
                { role: 'DEV' },
                { role: 'PM' }
            ]
        })
        .sort({ title: 1 })
        .then(staff => {
            res.render('staff/list', {
                staff: staff,
                isPM: req.session.currentUser?.role === 'PM',
            })
        })
        .catch(err => next(err))
})

module.exports = router