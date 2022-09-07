const router = require("express").Router()
const User = require("../models/User.model")
const isLogedin = require('../middleware/is_logedin.middleware')
const { roleValidation } = require('../middleware/roles.middleware');
const { STUDENT, PM } = require('../const/user.const');
const { userIsPM } = require('../utils/utils')

router.get('/students', isLogedin, (req, res, next) => {

    User
        .find()
        .then((students) => {
            res.render('students', { students })
        })
        .catch((err) => next(err))
}
);

router.get('/students/:id', isLogedin, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then((user) => {
            res.render('profile', user)
        })
        .catch((err) => next(err))
});

router.get('/student/:id', roleValidation([PM]), (req, res) => {

    const isPM = userIsPM(req.user)


    res.render('students/:id', { isPM })
})

router.get('/students/:id/delete', roleValidation([PM]), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch((err) => next(err));
});

router.get('/students/:id/update', roleValidation([PM]), (req, res, next) => {

    const { id: idUser } = req.params

    User.findById(idUser)
        .then(user => {
            res.render('update', user)
        })
        .catch((err) => next(err));
});



router.post('/students/:id/update', roleValidation([PM]), (req, res, next) => {

    const { username, description } = req.body

    User
        .findByIdAndUpdate(req.params.id, { username, description })
        .then((user) => {
            res.redirect('/students', user)
        })
        .catch((err) => next(err));
});
module.exports = router
