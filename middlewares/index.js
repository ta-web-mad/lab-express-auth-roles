module.exports = {
    nonLogged: (req, res, next) => {
        req.session.currentUser ? next() : res.render('/')
    },

    isPM: (req, res, next) => {
        req.session.currentUser.role === "PM" ? next() : res.render("/", { err })
    }
}