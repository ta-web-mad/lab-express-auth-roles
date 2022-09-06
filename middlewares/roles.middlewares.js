const roleValidation = (roles) => (req, res, next) => {
    // console.log('ESTA EXISTE???==>', req.session.user)
    const user = req.session.user;
    // ['ADMIN', 'COMPANY']
    if (req.session.user && roles.includes(req.session.user.role)) {
        console.log('estas dentrooooooo')
        req.app.locals.role = user.role
        next();
    } else {
        req.app.locals.role = null
        res.redirect('/auth/login');
    }
}


const puedesPasar = (roles, bool) => (req, res, next) => {
    // console.log('ESTA EXISTE???==>', req.session.user)
    const user = req.session.user;
    // ['ADMIN', 'COMPANY']
    if (req.session.user && roles.includes(req.session.user.role && bool)) {
        console.log('estas dentrooooooo')
        req.app.locals.role = user.role
        next();
    } else {
        req.app.locals.role = null
        res.redirect('/auth/login');
    }
}

module.exports = {
    roleValidation,
    puedesPasar
} 