const rolesChecker = user => {
    return {
        isPM: user?.role === 'PM',  
    }
}

module.exports = { rolesChecker }