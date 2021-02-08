module.exports = {
  isBoss: (user) => user.role === "BOSS",
  hashPassword: (password) => {
    if (password) {
      const bcrypt = require("bcrypt")
      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      return bcrypt.hashSync(password, salt)
    }
  },
}
