const router = require("express").Router()
const { isLoggedIn, checkRole, checkUser } = require("../middlewares/route-guard")
const User = require("../models/User.model")

router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find({ role: ['PM', 'TA', 'DEV'] })
        .then(staff => {
            res.render("staff/staff-list", { staff })
        })
        .catch(err => next(err))

})

router.get('/:staff_id', isLoggedIn, checkUser, (req, res, next) => {

    const { staff_id } = req.params

    User
        .findById(staff_id)
        .then(staff => {
            res.render('staff/staff-profile', {
                staff,
                isPM: req.session.currentUser?.role === 'PM'
            })
        })
        .catch(err => next(err))

})

router.get('/edit/:staff_id', isLoggedIn, checkUser, (req, res, next) => {

    const { staff_id } = req.params

    User
        .findById(staff_id)
        .then(staff => {
            res.render('staff/staff-edit', staff)
        })
        .catch(err => next(err))

})

router.post('/edit/:staff_id', isLoggedIn, checkUser, (req, res, next) => {

    const { email, username, profileImg, description, staff_id } = req.body

    User
        .findByIdAndUpdate(staff_id, { email, username, profileImg, description })
        .then(staff => res.redirect(`/staff/${staff_id}`))
        .catch(err => next(err))

})

router.post('/delete/:staff_id', checkRole('PM'), (req, res, next) => {

    const { staff_id } = req.params

    User
        .findByIdAndRemove(staff_id)
        .then(() => res.redirect('/staff'))
        .catch(err => next(err))

})

router.post('/:role/:staff_id', checkRole('PM'), (req, res, next) => {

    const { role, staff_id } = req.params

    User
        .findByIdAndUpdate(staff_id, { role })
        .then(() => res.redirect('/staff'))
        .catch(err => next(err))
})

module.exports = router