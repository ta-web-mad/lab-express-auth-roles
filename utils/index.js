module.exports = {
    isAdmin: user => user.role.includes('BOSS'),
    isEditor: user => user.role.includes('EDITOR'),
    isUser: user => user.role.includes('USER'),
}