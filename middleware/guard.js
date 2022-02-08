const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', {
        errorMessage: 'Haz log in/sign Up'
    })
}
const checkRole=(...pmRoles)=>(req,res,next)=>{
    pmRoles.includes(req.session.currentUser.role) ? next():res.render('auth/login',{
        errorMessage:'NO, Puedes , PASAAAAAAAR solo Roles nivel PM'
    })
}
module.exports = { isLoggedIn,checkRole }