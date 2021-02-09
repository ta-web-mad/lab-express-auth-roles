module.exports = {
    isBoss: user => user.role.includes('BOSS'),
    isDev: user => user.role.includes('DEV'),
    isTa: user => user.role.includes('TA'),
    isStudent: user => user.role.includes('STUDENT'),
    isGuest: user => user.role.includes('GUEST')
}