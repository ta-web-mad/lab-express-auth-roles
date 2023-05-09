const checkRole = (session) => {
    const roles = {}
    if (!session) roles.isVisitor = true
    else if (session.role === 'STUDENT') roles.isStudent = true
    else if (session.role === 'DEV') roles.isDev = true
    else if (session.role === 'TA') roles.isTA = true
    else if (session.role === 'PM') roles.isPM = true
    return roles
}
module.exports = checkRole