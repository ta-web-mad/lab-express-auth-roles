const sameId = (studentId) => (req, res, next) => {
    if(req.session.user && studentId === req.session.user._id) {
        next();
    } else {
        res.redirect ("/iniciar-sesion")
    }
}
module.exports = {
          sameId
        }