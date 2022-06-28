

const rolesChecker = user => {
    return {
        isPM: user?.role === 'PM',
        isTA: user?.role === 'TA',




    }
}

module.exports = { rolesChecker }