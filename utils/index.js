module.exports = {
    isBoss: user => user.includes('BOSS'),
    isTA: user => user.role.includes('TA'),
    isDev: user => user.role.includes('DEV'),
    isStudent: user => user.role.includes('STUDENT')
}