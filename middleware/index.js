const mongoose = require('mongoose')

module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: "Tienes que loggearte" })
    },
    checkId: (req, res, next) => {
        mongoose.Types.ObjectId.isValid(req.paramas.id) ? next() : res.redirect('/')
    },
    equalId: (req, res, next) => {
        req.session.currentUser._id === req.params.id ? next() : res.redirect('/estudiantes')
    }
}