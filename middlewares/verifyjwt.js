const jwt = require("jsonwebtoken");
const { unauthenticated } = require("../utils/cutomErrors");

const verifyToken = (req, res, next) => {
 
  const { token } = req.cookies;
  
  if (!token) throw new unauthenticated("authentication invalid please retry");

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      throw new unauthenticated("authentication invalid please retry");
    }
    const {id, role} = decoded
    const testuser = id === '65f6bcb3c3fa50ed71b87dfc'
    req.user = {id, role, testuser};
    console.log(testuser);
    next();
  });
};




module.exports = { verifyToken };
