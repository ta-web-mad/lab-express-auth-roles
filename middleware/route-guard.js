const isLoggedIn = (req, res, next) =>{
    req.session.currentUser ? next() : res.render("auth/login", {
        errorMessage: "¡Identifícate!"
    })
}

const checkRole = (...admitedRoles) => (req, res, next) => {
    
    admitedRoles.includes(req.session.currentUser.role) ? next() : res.render("auth/login", {
        errorMessage: `Debes tener el rol de ${admitedRoles}`
    })
}



module.exports = {isLoggedIn, checkRole}