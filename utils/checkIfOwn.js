function checkIfOwn(currentUser, student) {
    return currentUser._id === student._id.toString()
}


module.exports = { checkIfOwn }