module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/login')
        }
    },
    checkUser: (req, res, next) => {          // REST PARAMETERS
        if (req.session.currentUser) {
            return req.session.currentUser._id
        }

        else {
            next()
        }
    }
}