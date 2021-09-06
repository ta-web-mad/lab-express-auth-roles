module.exports = {
    userIsPM: user => user.role === 'PM',
    userIsTA: user => user.role === 'TA',
    userIsDEV: user => user.role === 'DEV',
    userIsSTUDENT: user => user.role === 'STUDENT'

}