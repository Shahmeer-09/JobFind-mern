const mongoose = require('mongoose')
const {JOB_STATUS, JOB_TYPE} = require('../utils/constants')
const jobSchema = new mongoose.Schema({
   company:String,
   position:String,
   jobStatus: {
      type:String,
      enum:Object.values(JOB_STATUS),
      default:JOB_STATUS.PENDING
   } ,
   jobType:{
    type:String,
    enum:Object.values(JOB_TYPE),
    default:JOB_TYPE.FULLTIME

   },
   jobLocation:{
       type:String,
       default:"my city",
   },
   createdBy:{
      type: mongoose.Types.ObjectId,
      ref:'User',
   }

}, {timestamps:true})
 const Job = mongoose.model('Job', jobSchema)
module.exports = Job