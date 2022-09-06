const router = require("express").Router()
const { STUDENT, DEV, TA, PM } = require("../const")
const UserModel = require('../models/User.model')

router.get('/', (req, res, next) => {
    UserModel.find({ role: STUDENT })
        .select('username _id')
        .then((students) => {
            res.render('student/students', { students })
        })
        .catch((err) => {
            next(err)
            console.log("ERROR FINDING STUDENTS")
            console.log(err)
        })

})

router.get('/:id', (req, res, next) => {
    let isUser = false;
    UserModel.findById(req.params.id)
        .then((student) => {
            const { _id, username, email, profileImg, description, role } = student
            if (req.session.currentUser) {
                if (_id.equals(req.session.currentUser._id)) {
                    console.log('Is the same user')
                    isUser = true
                }
            }

            res.render('student/student-details', { _id, username, email, profileImg, description, role, isUser })
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/:id/edit', (req, res, next) => {
    if (req.params.id === req.session.currentUser._id || req.session.currentUser.role === PM) {
        UserModel.findById(req.params.id)
            .then((user) => {
                const { _id, username, email, profileImg, description } = user
                res.render('student/student-edit', { _id, username, email, profileImg, description })
            })
            .catch((err) => {
                console.log("Error al buscar un usuario para editarlo")
                console.log(err)
                next(err)
            })
    } else {
        console.log('No tienes permiso')
        res.render('auth/login', { errorMessage: 'No tienes permisito' })
    }
})


router.get('/:id/delete', (req, res, next) => {
    if (req.params.id === req.session.currentUser._id || req.session.currentUser.role === PM) {
        UserModel.findByIdAndDelete(req.params.id)
            .then(() => {
                console.log('Usuario eliminado')
                res.redirect('/students')
            })
            .catch((err) => {
                next(err)
                console.log('Error eliminando estudiante')
                console.log(err)
            })
    } else {
        console.log('No tienes permiso')
        res.render('auth/login', { errorMessage: 'No tienes permisito' })
    }

})

router.get('/:id/updateToDev', (req, res, next) => {
    UserModel.findByIdAndUpdate(req.params.id, { role: DEV })
        .then((user) => {
            console.log('Updated user: ', user)
            res.redirect(`/students/${req.params.id}`)
        })
        .catch((err) => {
            console.log("Error promoteando a DEV")
            console.log(err)
            next(err)
        })
})

router.get('/:id/updateToTa', (req, res, next) => {
    UserModel.findByIdAndUpdate(req.params.id, { role: TA })
        .then((user) => {
            console.log('Updated user: ', user)
            res.redirect(`/students/${req.params.id}`)
        })
        .catch((err) => {
            console.log("Error promoteando a TA")
            console.log(err)
            next(err)
        })
})

router.post('/:id/edit', (req, res, next) => {
    // clean the req.body from empty arrays
    for (const key in req.body) {
        if (!req.body[key]) delete req.body[key]
    }
    const { email, username, profileImg, description } = req.body
    UserModel.findByIdAndUpdate(req.params.id, { email, username, profileImg, description })
        .then(() => {
            console.log("Usuario updateado")
            res.redirect('/students')
        })
        .catch((err) => {
            console.log('Error updaetando usuario')
            console.log(err)
            next(err)
        })
})
module.exports = router
