const { rolesChecker } = require('./../utils/roles-checker')

const viewerChecker = () => (req, res, next) => {
    if (req.params.id === req.session.currentUser._id || rolesChecker(req.session.currentUser._id))
        next()
    else {
        res.render('auth/login', { errorMessage: `You don't have the credentials to continue` })
    }
}

module.exports = { viewerChecker }