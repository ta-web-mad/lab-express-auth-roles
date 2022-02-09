const isLoggedIn =(req, res, next)=> {
    req.session.currentUser ? next () : res.render('auth/login', {
        errorMessage: 'identifícate'
    })
}

const checkRole = (...admittedRoles) => (req, res, next)=> {
    admittedRoles.includes (req.session.currentUser.role) ? next () : res.render('auth/login', {
        errorMessage: 'Solo personal autorizado: ${admittedRoles}'
    })
}

module.exports = {isLoggedIn, checkRole}