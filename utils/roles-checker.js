const rolesChecker = user => {
    return {
        isPM: user?.role === 'PM',
        // isEditor: user?.role === 'EDITOR'
    }
}

module.exports = { rolesChecker }