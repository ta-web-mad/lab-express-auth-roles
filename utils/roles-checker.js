const rolesChecker = user => {
    return {
        isDev: user?.role === 'DEV',
        isTA: user?.role === 'TA',
        isPM: user?.role === 'PM'
    }
}

module.exports = { rolesChecker }