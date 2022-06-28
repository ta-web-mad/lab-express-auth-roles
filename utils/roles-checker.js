const rolesChecker = user => {
    return {
        isPm: user?.role === 'PM',
        isDev: user?.role === 'DEV',
        isTa: user?.role === 'TA',
        isStudent: user?.role === 'STUDENT'
    }
}

module.exports = { rolesChecker }