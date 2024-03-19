const { Router } = require("express");
const router = Router();
const {register, login, logout} =require('../controllers/authControllers')
const {validateReg, validatelogin,} = require('../middlewares/validatExpressMiddleware')

router.post('/reg',validateReg, register )
router.post('/login',validatelogin, login )
router.get('/logout', logout)

module.exports = router

  