const rolesChecker = user => {
    return {
        isAdmin: user?.role === 'PM',
        isStudent: user?.role === 'STUDENT'
    }
}

module.exports = { rolesChecker }