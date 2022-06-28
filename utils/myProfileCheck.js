const myProfileCheck = user => {
    return (user === req.session.currentUser.id)

}

module.exports = { myProfileCheck }
