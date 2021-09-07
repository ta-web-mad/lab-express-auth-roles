const mongoose = require("mongoose")

module.exports= {

    isLoggedIn: (req,res, next) => {

        req.session.currentUser ? next() : res.render('auth/login', {errorMsg: 'Inicia sesion para continuar'})
        
    },

    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

    // checkUserOrPM: (req,res,next)=> {

    //     this.checkRoles

    // },

    isSameUser: (req, res, next) => {

        req.session.currentUser?._id === req.params.id ? next() : res.redirect('/students?error')

    },

    checkId: (req,res, next) => {

       if (req.session.currentUser?.id === req.params.id) next() 
       //else res.render('auth/login', {errorMsg: 'Inicia sesion para continuar'})
    }

}