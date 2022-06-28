const parseDate = date => {
    return date.toISOString().substring(0, 10)
}

module.exports = parseDate