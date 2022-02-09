const mongoose = require ('mongoose')

const IsUserPM = user => {
    if (user.role === 'PM'){
        return true
    }
    else if (!user) {
        return undefined
    
    } else {
        return false
    }
}

const isUserOwnProfile = (userid, linkid) => userid === linkid

const isMoreThanTaRole = userRole => userRole === 'TA' || userRole === 'PM'

module.exports = {
    IsUserPM,
    isUserOwnProfile,
    isMoreThanTaRole
}