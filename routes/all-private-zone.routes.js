const router = require("express").Router()
const { isLoggedIn } = require('./../middlewares/route-guard')

const Student = require('./../models/User.model')



// ----------> STUDENT PORTAL <----------

router.get('/student-portal', isLoggedIn, (req, res) => {

    res.render('limitedUsage/student-portal')
})


// ----------> STUDENTS LIST <----------

router.get('/students', isLoggedIn, (req, res) => {

    Student
        .find()                                                 //// ######### HACER QUE SOLO PONGA LOS STUDENTS
        .then(student => {
            res.render('limitedUsage/students', { student })
        })
        .catch(error => next(error))
})


// ----------> STUDENT PROFILE <----------

router.get('/student/:id', isLoggedIn, (req, res, next) => {
    
    const { id } = req.params
    const isPM = req.session.currentUser.role === 'PM'

    Student
        .findById(id)
        .then(selectedStudent => {
            res.render('limitedUsage/student-profile', { selectedStudent, isPM })
        })
        .catch(error => next(error))
})


// ----------> MY PROFILE <----------

router.get('/mi-perfil', isLoggedIn, (req, res, next) => {
    
    res.render('limitedUsage/my-profile', { user: req.session.currentUser })
})


// ----------> MY PROFILE EDIT <----------

router.get('/mi-perfil/:id/edit', isLoggedIn, (req, res, next) => {
    
    const { id } = req.params

    // Check you can only modify your own profile
    if (id === req.session.currentUser._id) {

        res.render('limitedUsage/edit-my-profile', { user: req.session.currentUser })
    } else {
        res.send('NO PUEDES EDITAR UN PERFIL QUE NO ES TUYO!')                  /// ##### PONER ESTO BONITO !!
    }
})

router.post('/mi-perfil/:id/edit', isLoggedIn, (req, res, next) => {
    
    const { id } = req.params
    const { email, password, username, description, profileImg } = req.body


    // Check you can only modify your own profile
    if (id === req.session.currentUser._id) {

        Student
            .findByIdAndUpdate(id, { email, password, username, description, profileImg })
            .then(user => {
                req.session.currentUser = user
                res.redirect('/student-portal')
            })
            .catch(error => next(error))
    } else {
        res.send('NO PUEDES EDITAR UN PERFIL QUE NO ES TUYO!')
    }
})






module.exports = router
