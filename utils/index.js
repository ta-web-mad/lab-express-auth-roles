const { checkRoles } = require("../middleware")

module.exports = {  
    isLogged: (user) => {
        return user != undefined
    },
    isPM: (user) => {
        return user === 'PM'
    }

}