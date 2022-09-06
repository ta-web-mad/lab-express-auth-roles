const isLogedin = (req, res, next) => {
    const user = req.session.currentUser;
    if (user) {
        next();
        return;
    }
    res.redirect('/auth/login');
};

module.exports = isLogedin;