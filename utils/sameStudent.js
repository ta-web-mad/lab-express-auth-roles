const ownStudent = (currentUser, userID) => userID === currentUser

const isTA = user => user.role === "TA"

const isPM = user => user.role === "PM"

module.exports = { ownStudent, isTA, isPM }