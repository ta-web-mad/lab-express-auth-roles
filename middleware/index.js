module.exports = {

    userLogged: (req, res, next) => {
        if (req.session.currentUser) {
            next();
        } else {
            res.render('index', {errorMsg: 'No user logged in'});
        }
    },

    userNotLogged:(req, res, next) => {
        if (req.session.currentUser) {
            res.redirect('/');
        } else {
            next();
        }
    },

    accessRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next();
        } else {
            res.render('index', { errorMsg: `Restricted. Log in as ${roles} to access` });
        }
    },

    idFormat: (req, res, next) => {
        const ObjectId = require('mongoose').Types.ObjectId;

        ObjectId.isValid(req.params.id)? next() : res.redirect(req.baseUrl);
    }

}