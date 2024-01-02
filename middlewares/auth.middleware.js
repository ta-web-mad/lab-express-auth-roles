const isLogged = (req,res,next) => {
    if (req.session.currentUser){
        next()
      } else {
        res.redirect('/iniciar-sesion')
      }
}

const checkRoles = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next();
    } else {
        res.redirect('/iniciar-sesion');
    }
};

const userCreatedIt = (req, res, next) => {
    const { id } = req.params
    const { role } = req.session.currentUser.role

    if (id == req.session.currentUser._id || role == "PM") {
        next()
    } else {
        res.render('/students')
    }
}


module.exports= {isLogged, checkRoles, userCreatedIt}