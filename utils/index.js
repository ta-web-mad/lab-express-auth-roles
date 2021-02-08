module.exports = {
    isBoss: user => user.role.includes('BOSS'),
    isUser: user => user.role.includes('BOSS', 'DEV', 'TA', 'STUDENT')
}