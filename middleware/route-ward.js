const logueado = (req, res, next) =>{
    if(!req.session.currentUser){
        res.redirect('/iniciar-sesion')
        return
    }
    next()

}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login-form', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}

module.exports = {logueado, checkRole}