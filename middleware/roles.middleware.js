const roleValidation = (roles) => (req, res, next) => {
    // ['PM, 'STUDENT', 'DEV', 'TA']
    console.log(req.session.currentUser)
    if (req.session.currentUser && roles.includes(req.session.currentUser.role)) {
        next();
    } else {
        console.log("hola")
        res.redirect('/iniciar-sesion');
    }
}


module.exports = {
    roleValidation
}