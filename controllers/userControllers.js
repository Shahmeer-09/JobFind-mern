const User = require('../model/user.model')
const Job = require('../model/Job.model')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('cloudinary').v2
const fs = require('fs').promises
const getCurrentuser = async(req, res)=>{

   const user = await User.findOne({_id:req.user.id})
   const {password, ...rest} = user._doc
   res.status(StatusCodes.OK).json({rest})
}
const getApllicationStats = async(req, res)=>{
     const users =await User.countDocuments()
     const jobs =await Job.countDocuments()
     res.status(StatusCodes.OK).json({users, jobs})
}
const updateUser = async(req, res)=>{
     const newUser = {...req.body}
     delete newUser.password;
     if(req.file){
          
          const res = await cloudinary.uploader.upload(req.file.path)
            await fs.unlink(req.file.path)
           newUser.avatar = res.secure_url
           newUser.avatarPublicId = res.public_id

     }
   
     const userupdated = await User.findOneAndUpdate({_id:req.user.id}, newUser)
     if(req.file && userupdated.avatarPublicId){
        await cloudinary.uploader.destroy(userupdated.avatarPublicId)
     }
     res.status(StatusCodes.OK).json({msg:"user updated succefully"})

}

module.exports = {getApllicationStats, getCurrentuser, updateUser}