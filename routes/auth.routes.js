const router = require("express").Router();
const app = require('../app')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')





//GETO FORM TO SIGN UP

router.get('/signup', (req, res) => res.render('auth/signup'));

//GET FROM FORM TO REGISTER USER IN DB

router.post('/signup', (req, res) => {


    const { username, pwd } = req.body

    if (username.length === 0)
        res.render('auth/signup', { errorMessage: 'completa los campos tontín' })
    else if (pwd.length === 0) {
        res.render('auth/signup', { errorMessage: 'completa los campos tontín' })

    }

    // si el username que escribe el cliente ya está cogido, salta error. Sino, regístra el ususario.
    User
        .findOne({ username })
        .then(user => {


            if (user) {
                res.render('auth/signup', { errorMessage: 'Usuario ya registrado' })
                return
            }

            //registro de ususario con password encriptada

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)//ponemos pwd para no confundirlo con la password real
            // pwd es el hash que encripta la password real y es la que queda registrada en la BBDD
            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})

// ----------------------------------------------------------------------

//GET TO LOG IN 

router.get('/login', (req, res) => res.render('auth/login'))

router.post('/login', (req, res) => {

    const { username, pwd } = req.body



    User //BBDD, dime si hay un usuario con este.
        .findOne({ username })
        // o user === false, es decir, si no está en la BBDD, mensaje de error.
        .then(user => {

            if (username.length === 0)
                res.render('auth/signup', { errorMessage: 'completa los campos tontín' })
            else if (pwd.length === 0) {
                res.render('auth/signup', { errorMessage: 'completa los campos tontín' })

            }

            if (!user) {
                res.render('auth/login', { errorMessage: 'Usuario no reconocido' })
                return
            }
            //si la password es incorrecta mediante uso de bcrypt, que nos verifica si nuestra password es la verdadera
            //mediante comparación con el hash que crea el sistema de encriptación para esa password en  concreto.
            //si la comparación entre ambos elementos no coincide, logea un error de password 'errormessage'
            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            //en caso de que todo lo anterior no se haya ejecutado, username y password son correctas.
            //usuario entra en la SESIÓN!!!! y nos redirige a la view 'profile' que tenemos que crear.

            req.session.currentUser = user      // Iniciar sesión = almacenar el usuario logueado en req.session.currentUser
            res.redirect('/')
        })
        .catch(err => console.log(err))

}
)

router.get('/desconectar', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router