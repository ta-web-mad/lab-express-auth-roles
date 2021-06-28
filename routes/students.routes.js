const router = require("express").Router()
const bcrypt = require('bcrypt')

const User = require('./../models/user.model')


const { checkLoggedUser, checkRoles } = require('./../middleware')



// Students list
router.get('/', checkLoggedUser, (req, res) => {

    const isPM = req.session.currentUser?.role === 'PM'
    console.log(`*********************${isPM}`)

    User
        .find()
        // .select('name')
        // .then(students => res.send(students))
        .then(students => {
            students.forEach( (student) => {
                student.isPM = student.role === "PM" ? true : false 
            })
            res.render('students/students-list-page', {students, isPM})
        }) 
        .catch(err => console.log(err))
})

router.get('/:id', checkLoggedUser, (req, res) => {

    const {id} = req.params
    console.log("************id",id)

    // const isAdmin = req.session.currentUser?.role === 'ADMIN'

    User
        .findById(id)
        // .select('name')
        // .then(students => res.send(students))
        .then(student => res.render('students/student-details-page', student))
        .catch(err => console.log(err))
})


// router.get("/:id/edit", (req, res) => {
//     const {id} = req.params
   
//     User
//         .findById(id) 
//         .then( student => {
//             res.render('students/student-edit-page', student )
//         }   )

// });


// router.post('/:id/edit', (req, res) => {
//     const {id} = req.params
//     const { username, name, profileImg, description, role } = req.body

//     User
//         .findByIdAndUpdate(id, { username, name, profileImg, description, role })
//         // .then( (st) => res.send(st))
//         .then( () => res.redirect('/students'))
//         .catch( (err) => res.send(`Get a grip. You've got errors: ${err}`))
        
// })


// router.post('/:id/delete', checkLoggedUser, checkRoles('PM'), (req, res, next) => {
//     const {id} = req.params
//     User   
//         .findByIdAndRemove(id)
//         .then(() => {
//             res.redirect('/students')
//         })
//         .catch(err => res.send("Error. Can't delete, can't programm."))
// })




module.exports = router