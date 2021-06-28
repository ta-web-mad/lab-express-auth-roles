
module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.render('auth/login', { errorMessage: 'Access denied, please log in to proceed' })
        }
    },
    // whatever: (req, res, next) => {
    //     console.log('SOY UN MIDDLEWARE QUE NO HACE NAda lalalalLALAL')
    //     next()
    // },
    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('auth/login', { errorMessage: 'Restricted Area, NOOB!!! ' })
        }
    },


     checkId: id => (req, res, next) => {
        if (id.match(req.session.currentUser.id)) {
            next()
        } else {
            res.render('auth/login', { errorMessage: 'Not your area!!! ' })
        }
    }
}