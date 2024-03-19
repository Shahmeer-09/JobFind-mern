const { unauthorizedError } = require("../utils/cutomErrors");

const verifyRoles = (...roles)=>{
    console.log(roles);
     return (req, res, next)=>{
         if(!roles.includes(req.user.role)){
            throw new unauthorizedError('permission denied')
         }
         next()
     }
}
module.exports = verifyRoles;