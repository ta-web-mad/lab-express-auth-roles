module.exports = {
    isBoss: user => user.role.includes('BOSS'),
    isDev: user => user.role.includes('DEV', 'TA'),
    isGuest: user => user.role.includes('GUEST')
}