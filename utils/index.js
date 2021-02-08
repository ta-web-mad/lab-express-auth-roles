module.exports = {
    isAdmin: user => user.role.includes('BOSS'),
    isEditor: user => user.role.includes('GM'),
    isUser: user => user.role.includes('USER')
}