const { Router } = require("express");
const router = Router();
const {
  getApllicationStats,
  getCurrentuser,
  updateUser,
} = require("../controllers/userControllers");
const {
  validateUpdatedUser,
} = require("../middlewares/validatExpressMiddleware");
const uploads= require('../middlewares/multerMiddleware')
const { verifyToken } = require("../middlewares/verifyjwt");
const  verifyRoles = require("../middlewares/verifyPermissions");

router.get("/current-user", verifyToken, getCurrentuser);
router.get("/admin/app-stats", [
  verifyToken,
  verifyRoles("admin"),
  getApllicationStats,
]);
router.patch("/update-user", verifyToken, uploads.single('avatar') , validateUpdatedUser, updateUser);

module.exports = router;
