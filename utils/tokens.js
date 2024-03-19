const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
      return jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: process.env.EXPIRES_IN 
    })  
}


module.exports = generateToken;