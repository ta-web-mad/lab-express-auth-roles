const isStudent = user => user.role === 'STUDENT'
const isDeveloper = user => user.role === 'DEV'
const isTeacherAssistant = user => user.role === 'TA'
const isProductManager = user => user.role === 'PM'                         // retorna True or False

module.exports = { isStudent, isDeveloper, isTeacherAssistant, isProductManager }

