function formatRole(role) {
    switch (role) {
        case 'STUDENT':
            return 'Estudiante'
        case 'DEV':
            return 'Developer'
        case 'TA':
            return 'Teacher assistant'
        case 'PM':
            return 'Proyect Manager'
    }

}

function formatUser(student) {
    const formatedUser = {
        id: student._id,
        username: student.username,
        email: student.email,
        profileImg: student.profileImg,
        description: student.description,
        role: formatRole(student.role)
    }
    return formatedUser
}
module.exports = {
    formatRole,
    formatUser
}