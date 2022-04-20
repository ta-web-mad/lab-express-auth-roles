const checkPM= user => user.role === 'PM'
const checkST = user => user.role === 'STUDIENT'
const changeTA = user => user.role === 'TA'
const changeDEV = user => user.role === 'DEV'

 
module.exports = { checkPM, checkST, changeTA, changeDEV }
