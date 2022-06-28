const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/session-guard')
const { checkRole } = require('./../middleware/roles-checker')
const { checkOwnerOrPM } = require('./../middleware/same-user')

const { rolesChecker } = require("../utils/roles-checker");


router.get('/edit/:id', isLoggedIn, checkOwnerOrPM, (req, res, next) => {
    const { id } = req.params


    User
        .findById(id)
        .then(data => {

            res.render('students/edit', { data })

        })
        .catch(err => console.log(err))
})

router.post('/edit/:id', isLoggedIn, checkOwnerOrPM, (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(student => res.redirect('/'))
        .catch(err => console.log(err))

})

router.post('/updateTA/:id', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})

router.post('/updateDEV/:id', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.post('/delete/:id', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))

})

module.exports = router
