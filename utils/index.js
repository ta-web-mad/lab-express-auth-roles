module.exports = {
    userIsPm: user => user.role === 'PM',
    userIsStudent: user => user.role === 'Students'
}