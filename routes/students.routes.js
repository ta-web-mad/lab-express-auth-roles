const router = require("express").Router()
const UserModel = require("../models/User.model")

const { PM, STUDENT, TA, DEV } = require('../const/user.const');
const { roleValidation } = require('../middleware/roles.middleware');

router.get('/', (req, res, next) => {

    if (req.session.currentUser) { //aqui iria el
        UserModel.find()
            .then(students => {
                res.render('students/listStudents', { students })
            })
            .catch(error => next(error))

    } else {
        res.redirect('/iniciar-sesion')
    }
})

router.get('/:id/view', roleValidation([PM, STUDENT, TA, DEV]), (req, res, next) => {
    let isAdmin = false
    let canEdit = false

    UserModel.findById(req.params.id)
        .then((student) => {
            console.log(student)
            if (req.session.currentUser.role === PM) {
                isAdmin = true
            } else if (req.session.currentUser._id.toString() === req.params.id.toString()) {
                canEdit = true
            }
            console.log({ student, isAdmin, canEdit })
            res.render('students/viewStudent', { student, isAdmin, canEdit })
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/:id/edit-form', (req, res, next) => {
    let isAdmin = false
    UserModel.findById(req.params.id)
        .then((student) => {
            console.log(student)
            if (req.session.currentUser.role === PM) {
                isAdmin = true
            }

            res.render('students/edit-form', { student, isAdmin })
        })
        .catch((err) => {
            next(err);
        });
});


router.post('/:id/edit-form', (req, res, next) => {
    const { username, description, profileImg, role } = req.body;
    UserModel.findByIdAndUpdate(req.params.id, { username, description, profileImg, role })
        .then((updateUser) => {
            console.log(updateUser)
            res.redirect('/students')
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/:id/delete', (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then((deleteUser) => {
            console.log(deleteUser)
            res.redirect('/students')
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router


