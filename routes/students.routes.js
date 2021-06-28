const router = require("express").Router()
const { checkRoles } = require("../middleware")
const User = require('./../models/User.model')



router.get('/students', (req, res) => {

    const isPm = req.session.currentUser?.role === 'PM'

    User
        .find()
        .select('username')
        .then(users => {
            res.render('students/students', { users, isPm })
            })
        
        .catch(err => console.log(err))
})

/* GET students's profile */
router.get('/students/:id', (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(movie => res.render('students/students-profile', movie))
        .catch(err => console.log(err))

})

/* POST Delete students */
router.post('/students/:id/delete', (req, res) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})



module.exports = router