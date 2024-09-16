const router = require("express").Router()
const User = require("../models/User.model");
const {isProductManager} = require("../utils");
const {isLoggedIn, allowEdit, checkRole} = require("../middleware/route-guard");

// student list
router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(studentsList => res.render('../views/student-list', { studentsList }))
        .catch(err => console.log(err))
})

//student profile
router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        //.then(studentDetail => res.send(studentDetail))
        .then(studentDetails => res.render('../views/student-detail', { 
            studentDetails,
            isProductManager: isProductManager(req.session.currentUser),
            allowEdit: id === req.session.currentUser._id                       //check if the student to edit is the user login
        }))
        .catch(err => console.log(err))

})

router.post('/students/:id' , isLoggedIn, allowEdit, (req,res,next) => {

    const { id } =req.params
    const { role } =req.body

    console.log(role);

    User
        .findByIdAndUpdate(id, {role}, { new: true })
        .then(()=> res.redirect('/students') )
        .catch(err => next(err) )
})

router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

module.exports = router;