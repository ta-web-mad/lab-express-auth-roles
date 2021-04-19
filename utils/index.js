module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isBOSS: user => user && user.role === 'BOSS',
    isTA: user => user && user.role === 'TA',
    isDEV: user => user && user.role === 'DEV',
    isCurrentUser: (user, sessionUser) => user.id === sessionUser._id
}