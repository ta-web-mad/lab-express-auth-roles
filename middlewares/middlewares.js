const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/iniciar-sesion')
        return
    }
    next();
}
const isPmLogged = (req, res, next)=>{
    if (!req.session.currentUser.roles.includes('PM')){
        res.redirect('/iniciar-sesion')
        return
    } 
    next();
}
const isTaLogged = (req, res, next)=>{
    if (!req.session.currentUser.roles.includes('TA')) {
        res.redirect('/iniciar-sesion')
        return
    }
    next();
}
module.exports = {
    isLoggedIn, isPmLogged,isTaLogged
}