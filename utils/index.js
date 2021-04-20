module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isBoss: user => user && user.role === 'BOSS',
    isTa: user => user && user.role === 'TA',
    isDev: user => user && user.role === 'DEV'
}