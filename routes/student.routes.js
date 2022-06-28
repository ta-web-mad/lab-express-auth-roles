const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/session-guard')
const { checkRole } = require('./../middleware/roles-checker')
const { checkOwnerOrPM } = require('./../middleware/same-user')


const { rolesChecker } = require("../utils/roles-checker");


router.get("", isLoggedIn, (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser)

    User
        .find({ role: 'STUDENT' })
        .then(students => {
            res.render('students/list', { students, roles })
        })
        .catch(err => console.log(err))

})

router.get('/:student_id', isLoggedIn, checkOwnerOrPM, (req, res, next) => {
    const { student_id } = req.params
    const roles = rolesChecker(req.session.currentUser)


    User
        .findById(student_id)
        .then(studentData => {
            res.render('students/details', { studentData, roles })
        })
        .catch(err => console.log(err))
})




module.exports = router