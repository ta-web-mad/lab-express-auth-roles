const router = require('express').Router();
const Course = require('../models/Course.model');
const User = require('../models/User.model');

router.get('/', (req, res) => {
    res.render('course/');
});

router.get('/create', (req, res) => {
    res.render('course/create');
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, duration, startDate, endDate, students } = req.body;
    Course.create({ name, description, imageUrl, duration, startDate, endDate, students })
        .then(course => {
            res.redirect('/course');
        })
        .catch(err => next(err));
});


module.exports = router;