const router = require("express").Router()

const User = require('./../models/user.model')

const { checkLoggedUser, checkRoles } = require("../middleware")

router.get('/panel', checkLoggedUser, checkRoles('PM'), (req, res) => {
    res.render('admin/admin-panel-page', req.session.currentUser)
})



router.get("/:id/edit", checkLoggedUser, checkRoles('PM'), (req, res) => {
    const {id} = req.params
    const isPM = req.session.currentUser._id === id
   
    User
        .findById(id) 
        .then( student => {
            let roles = [ 
                {role: "STUDENT", isSelected: false},
                {role: "TA", isSelected: false},
                {role: "DEV", isSelected: false}                
            ]
            roles.forEach( el => el.isSelected = el.role === student.role ? true : false)
            student.roles = roles
            student.isPM = isPM // IF CAN ACCESS THIS ROUTE, THEN HE IS THE PM
            res.render('admin/student-edit-page', student )
        }   )

});


router.post('/:id/edit', checkLoggedUser, checkRoles('PM'), (req, res) => {
    const {id} = req.params
    const { username, name, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(id, { username, name, profileImg, description, role })
        // .then( (st) => res.send(st))
        .then( () => res.redirect('/students'))
        .catch( (err) => res.send(`Get a grip. You've got errors: ${err}`))
        
})


router.post('/:id/delete', checkLoggedUser, checkRoles('PM'), (req, res, next) => {
    const {id} = req.params
    User   
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => res.send("Error. Can't delete, can't programm."))
})




module.exports = router