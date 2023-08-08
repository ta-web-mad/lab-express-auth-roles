const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('../middleware/route-guard')

//Edit student form(render)

router.get('/edit/:user_id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { user_id } = req.params

    const owner = user_id === req.session.currentUser._id

    if (owner || req.session.currentUser.role === 'PM') {

        User
            .findById(user_id)
            .then(student => res.render('student/student-edit', (student)))
            .catch(err => next(err))

    } else {

        res.redirect('/inicio.sesion')
    }
})

//Edit student form (handler)
router.post('/edit/:user_id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const { user_id } = req.params
    const { email, username, profileImg, description } = req.body

    User
        .findByIdAndUpdate(user_id, { email, username, profileImg, description })
        .then(student => res.redirect(`/details/${student._id}`))
        .catch(err => next(err))
})

//Delete student form (handler)
router.post('/delete/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))

})

//Mark as DEV form (handler)




module.exports = router