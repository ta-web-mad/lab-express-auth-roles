const { STUDENT, DEV, TA, PM } = require('../const/index')
const checkRole = (req, res, next) => {
    req.app.locals.isLogged = false
    req.app.locals.isPm = false
    req.app.locals.isDev = false
    req.app.locals.isTa = false
    req.app.locals.isStudent = false

    if (req.session.currentUser) {
        req.app.locals.isLogged = true
        switch (req.session.currentUser.role) {
            case STUDENT:
                req.app.locals.isStudent = true;
                break;
            case DEV:
                req.app.locals.isPm = true;
                break;
            case TA:
                req.app.locals.isTa = true;
                break;
            case PM:
                req.app.locals.isPm = true;
                break;
        }
    }
    next();
}


module.exports = checkRole