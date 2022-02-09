
const isOwner = require("../utils/index")
const userLogged = (req, res, next) => {


    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: "Por favor, autentíquese" })

}

const privilegeCheck = (...admittedRoles) => (req, res, next) => {


    const { id } = req.params
    console.log("A C T U A L", req.session.currentUser._id)
    console.log("R E Q E R I D O ", id)
    if (req.session.currentUser._id === id) {
        console.log("E S    E L    D U E Ñ O")
        next()
    }

    else if (admittedRoles.includes(req.session.currentUser.role)) {
        console.log("E S    E L    A D M I N")
        next()



    }

    else {
        res.render('auth/login', {
            errorMessage: `No tiene autorización para realizar esta acción`
        })
    }
}





module.exports = { userLogged, privilegeCheck }


