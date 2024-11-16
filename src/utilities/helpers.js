const jwt = require('jsonwebtoken')

const token = (user) => {
    const data = {
        userName: user.name,
        userId: user.idauthors
    }
    return jwt.sign(data, 'actividad8')
}

module.exports = {
    token
}