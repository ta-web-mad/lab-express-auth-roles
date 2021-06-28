const router = require("express").Router()
const bcrypt = require('bcrypt')
const { isLoggedOut, setIsLoggedInProperty } = require("../middleware")

const User = require('./../models/user.model')


// Signup
router.get('/signup', isLoggedOut, setIsLoggedInProperty, (req, res) => res.render('auth/signup-page'))

router.post('/signup', (req, res) => {
    const { username, pwd, name, profileImg, description } = req.body
    // res.send(req.body)

    User
        .findOne({ username })
        .then( user => {
            if( user ){
                res.render('auth/signup-page', {errorMessage: 'Dude, unavailable username. REINVENT YOURSELF :))'})
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            console.log('salt', salt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass, name, profileImg, description})
                .then( (student) => {
                    req.session.currentUser = student
                    // app.locals.isLoggedIn = true
                    res.redirect('/')
                })
                .catch( err => console.log(err))


        })
        .catch( err => console.log(err) )


})



// Login
router.get('/login', isLoggedOut, setIsLoggedInProperty, (req, res) => res.render('auth/login-page'))

router.post('/login', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login-page', { errorMessage: 'Not a bro yet!' })
                return
            }


            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('auth/login-page', { errorMessage: 'Not your day! Look up the password in the secret.docx and come back!' })
                return
            }
            req.session.currentUser = user //distruge session, dar cookie ramane. Doar ca nu ai ce face cu ea!!!
            // console.log('************ req.session:', req.session)
            // app.locals.isLoggedIn = true
            res.redirect('/')
        })
        .catch(err => console.log(err))

})


// Logout
router.get('/logout', setIsLoggedInProperty, (req, res) => {

    // req.session.destroy( () => res.send(req.session))
    // app.locals.isLoggedIn = false
    req.session?.destroy( () => res.redirect('/'))
    // res.send(req.session)
    // res.redirect('/')
    
})



module.exports = router