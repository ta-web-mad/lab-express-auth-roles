module.exports = {
  isBoss: (user) => (user.role === "BOSS" ? true : false),
  hashPassword: (password) => {
    const bcrypt = require("bcrypt")
    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    return bcrypt.hashSync(password, salt)
  },
}
