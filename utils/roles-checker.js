const rolesChecker = user => {
    return {
        isAdmin: user?.role === 'PM',
    }
}

module.exports = { rolesChecker }