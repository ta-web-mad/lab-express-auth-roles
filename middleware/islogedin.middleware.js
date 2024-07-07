const isLogedin = (req, res, next) => {
    const { currentUser } = req.session;
    if (currentUser) {
        next();
        return;
    }
    res.redirect('/');
};

module.exports = isLogedin;
