const rolesChecker = user => {
    return {
        isAdmin: user?.role === 'PM',
        isEditor: user?.role === 'TA',
        isStudent: user?.role === 'STUDENT',
    }
}

module.exports = { rolesChecker }