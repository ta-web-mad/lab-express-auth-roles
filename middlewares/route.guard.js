const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/signup', { errorMessage: 'Inicia sesión para continuar' })
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

const checkOwnerOrPm = (req, res, next) => {

    const {id_student} = req.params
    
  if(req.session.currentUser._id === id_student || req.session.currentUser.role === "PM" ){
    next()
  }else{
    res.render("students/profile-page")
  }
 
}

module.exports = { isLoggedIn, checkRoles, checkOwnerOrPm }


