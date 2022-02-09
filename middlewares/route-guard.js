const User = require('./../models/User.model')

const isLoggedIn = (req,res,next) => {
    if(!req.session.currentUser){
        res.render('./auth/login', {errorMessage: 'Debes iniciar sesión para ver esto'})
    }
    next()
}
const moreThanTAPrivileges = (req,res,next) => 
    req.session.currentUser.role === 'TA' || req.session.currentUser.role === 'PM'?
    next() : res.render('./auth/login', {errorMessage: 'Debes iniciar sesión ppara ver esto.'})


    const IsUserPMM = (req,res,next)=>{
        if (req.session.currentUser){
            if (req.session.currentUser.role === 'PM'){
               next()
            }
            else { 
                User
                .find()
                .then(allStudents => res.render("./students/list", {user:req.session.currentUser,PM:false, allStudents}))
                .catch(err=> next(err))
            }
            
        } else{
            User
            .find()
            .then(allStudents=>res.render("./students/list", {allStudents}))
            .catch(err=>next(err))
        }
    }

module.exports = {
    isLoggedIn,
    moreThanTAPrivileges, 
    IsUserPMM
}