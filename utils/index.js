module.exports = {
    userIsTA: user => user.role === 'TA',
    userIsDEV: user => user.role === 'DEV',
    userIsPM: user => user.role === 'PM', 
    userIsSelf: (user, studentId) => user === studentId
}