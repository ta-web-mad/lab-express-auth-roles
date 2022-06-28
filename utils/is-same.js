

const sameID = id => {
    let isSame = false
    if (id === req.session.currentUser._id) {
        isSame = true
    }
}

module.exports = { sameID }

