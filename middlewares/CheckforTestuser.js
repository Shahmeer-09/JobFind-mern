const {BadrequestError }= require("../utils/cutomErrors")

const checkTestUser = (req, res, next)=>{
    console.log(req.user.testuser)
    if(req.user.testuser){
        throw  new BadrequestError("Test User. Read Only")
    }
    next()
} 
module.exports = checkTestUser;