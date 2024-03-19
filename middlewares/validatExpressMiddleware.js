const { body, validationResult, param } = require("express-validator");
const { BadrequestError, NotfoundError, unauthenticated } = require("../utils/cutomErrors");
const { JOB_STATUS, JOB_TYPE } = require("../utils/constants");
const mongoose = require("mongoose");
const Job = require("../model/Job.model");
const User = require("../model/user.model");


const validatorFunction = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no job")) {
          throw new NotfoundError(errorMessage);
        }else if(errorMessage[0].startsWith("wrong")){
          throw new unauthenticated(errorMessage);
        
        }else if(errorMessage[0].startsWith("not authorized")  ){
           throw new unauthenticated(errorMessage);
        }
        throw new BadrequestError(errorMessage);
      }
      next();
    },
  ];
};
module.exports.validateJobid = validatorFunction([
  param("id").custom(async (value ,{req}) => {
    const validid = mongoose.isValidObjectId(value);
    if (!validid) throw new BadrequestError("invalid id");
    const job = await Job.findById(value);
    if (!job) throw new NotfoundError(`no job with id ${id}`);
     const isadmin = req.user.role === 'admin';
     const iscreator = req.user.id === job.createdBy.toString();
     if(!isadmin && !iscreator) throw new unauthenticated("not authorized to perform this action");
  }),
]);
module.exports.validateJob = validatorFunction([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalide value provided"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalide value provided"),
]);
module.exports.validateReg = validatorFunction([
  body("name").notEmpty().withMessage("name is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Format is not right ")
    .custom(async (email) => {
      const chckDublication = await User.findOne({ email });
      if (chckDublication) throw new BadrequestError("email already exist");
    }),
  body("lastName").notEmpty().withMessage("invalide lastname provided"),
  body("location").notEmpty().withMessage("invalide location provided"),
]);
module.exports.validatelogin = validatorFunction([

  body("email")
  .notEmpty()
  .withMessage("email is required")
  .isEmail()
  .withMessage("Format is not right ")
  .custom(async (email)=>{
     const validuser = await User.findOne({ email });
     if (!validuser) throw new unauthenticated("wrong credentials  (email) ");
  }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
]);

module.exports.validateUpdatedUser = validatorFunction([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Format is not right ")
    .custom(async (email,{req}) => {
      const chckDublication = await User.findOne({ email });
      console.log(req.user.id);
      console.log(chckDublication._id);
      if (chckDublication && req.user.id !== chckDublication._id.toString()) throw new BadrequestError("email already exist");
    }),
  body("lastName").notEmpty().withMessage("invalide lastname provided"),
  body("location").notEmpty().withMessage("invalide location provided"),
])