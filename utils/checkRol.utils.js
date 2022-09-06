const checkRoleUser = ((user, role) => user.role === role)

const checkUser = ((session, user) => session === user)
module.exports = {
    checkRoleUser,
    checkUser
} 