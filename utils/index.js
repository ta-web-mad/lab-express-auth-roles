module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isBoss: user => user && user.role === 'BOSS',
    checkUser: (user) => {
        if (user) {
            return user._id
        }
    },
    checkUser2: (user, id) => user && user._id === id,
}