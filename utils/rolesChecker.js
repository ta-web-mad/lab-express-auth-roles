const rolesChecker = user => {
    return {
        isPM: user?.role === 'PM',
        isTA: user?.role === 'TA',
        isSTUDENT: user?.role === 'STUDENT',
        isDEV: user?.role === 'DEV'
    }
}

module.exports = { rolesChecker }
