const { Router } = require("express");
const {verifyToken } = require("../middlewares/verifyjwt");
const checkTestUser = require("../middlewares/CheckforTestuser");
const router = Router();
const  { validateJob,validateJobid} = require("../middlewares/validatExpressMiddleware");
const {
  createjob,
  gettALljob,
  updatejob,
  getaJob,
getStats,
  deletejob,
} = require("../controllers/jobsController");

router.get("/get",verifyToken , gettALljob);
router.post("/create",verifyToken, checkTestUser ,validateJob, createjob);
router.get("/get/:id",verifyToken ,validateJobid, getaJob);
router.patch("/update/:id",verifyToken, checkTestUser  ,validateJob,validateJobid,  updatejob);
router.delete("/del/:id",verifyToken, checkTestUser ,validateJobid, deletejob);
router.get('/stats', verifyToken, getStats )
module.exports = router;
