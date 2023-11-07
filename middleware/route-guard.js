//esto no lo necesito en app.js porque la forma de exportarlo es otra
const isLoggedIn = (req, res, next) => {
    if(req.session.currentUser){
        next()
    }
    else{
        res.redirect('/iniciar-sesion')
    }
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    
    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)){
        
        next()
    }
    else {
        res.redirect('/iniciar-sesion')
    }
}

const checkMyProfile = (actualUser) => (req, res, next) => {
    if(req.session.currentUser._id === actualUser) {
        next()
    }
    else{
        res.send('no macho no eres tu')
    }
}



module.exports= {
    isLoggedIn,
    checkRole,
    checkMyProfile
}