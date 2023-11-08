
const router = require("express").Router()

const User = require('./../models/User.model')
const { isLoggedIn, checkRole } = require('./../middleware/route-guards')
module.export = router



router.get("/students", isLoggedIn, checkRole('PM'), (req, res) => {
    res.render("USER/ADMIN-PANEL", { user: req.session.currentUser })
})

router.get('/students', (req, res) => {


    User
        .find({ role: STUDENT })
        .then(user => res.render('/students',
            {
                user: user,
                isPM: req.session.currentUser.role === 'PM',

            }
        ))
        .catch(err => console.log(err))

})


router.get('/students/:id', (req, res) => {


    User
        .find({ role: STUDENT })
        .then(user => res.render('/students',
            {
                user: user,
                isPM: req.session.currentUser.role === 'PM',

            }
        ))
        .catch(err => console.log(err))


})
