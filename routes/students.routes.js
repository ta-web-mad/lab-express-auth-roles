const router = require("express").Router()
const bcrypt = require('bcrypt')

const User = require('./../models/user.model')


const { checkLoggedUser, checkRoles } = require('./../middleware')



// Students list
router.get('/', checkLoggedUser, (req, res) => {


    const isPM = req.session.currentUser?.role === 'PM'
    // const canEdit = req.session.currentUser?._id === 'PM'
    console.log(`*********************${isPM}`)

    User
        .find()
        // .select('name')
        // .then(students => res.send(students))
        .then(students => {

            if(students.length == 0){
                res.redirect('/')
                return
            }

            students.forEach( (student) => {
                student.isPM = student.role === "PM" ? true : false 
                student.canEdit = ( student._id == req.session.currentUser?._id)
                // student.canEdit = ( student._id === req.session.currentUser?._id) // DOES NOT WORK IN STRICT MODE
                // console.log(student.canEdit, req.session.currentUser?._id, student._id)
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


router.get("/:id/edit",checkLoggedUser, checkRoles('PM', 'TA', 'STUDENT'), (req, res) => {
    const {id} = req.params
    const canEdit = id == req.session.currentUser?._id
    if( canEdit == false){
        res.redirect('/students')
        return
    }
   
    User
        .findById(id) 
        .then( student => {
            res.render('students/student-self-edit-page', student )
        }   )

});


router.post('/:id/edit', (req, res) => {
    const {id} = req.params
    const { username, pwd, name, profileImg, description, role } = req.body

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    console.log('salt', salt)
    const hashPass = bcrypt.hashSync(pwd, salt)

    User
        .findByIdAndUpdate(id, { username, password: hashPass, name, profileImg, description, role })
        // .then( (st) => res.send(st))
        .then( () => res.redirect('/students'))
        .catch( (err) => res.send(`Get a grip. You've got errors: ${err}`))
        
})


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