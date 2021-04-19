module.exports = {
    cleanText: text => text.trim(),
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    isBoss: user => user && user.role === 'BOSS',
    isStudent: user => user && user.role === 'STUDENT',
    canEdit: (user, userId) => (user && (user._id === userId || user.role === "BOSS")),
    isSameUser: (user, userId) => user && user._id === userId,
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
}