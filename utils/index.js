



const isTA = user => user.role === "TA"
const isPM = user => user.role === "PM"
const isDEV = user => user.role === "DEV"
const isOwner = (userId, id) => userId === id

const hasNumber = string => {
    return /\d/.test(string);
}

const capitalize = text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()

const cleanText = text => text.trim()

const checkMongoID = id => mongoose.Types.ObjectId.isValid(id)

const formatDate = date => {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
}


module.exports = { isTA, isPM, isDEV, isOwner, hasNumber, capitalize, cleanText, checkMongoID, formatDate }