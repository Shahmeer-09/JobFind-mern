const { StatusCodes } = require("http-status-codes");
const User = require("../model/user.model");
const { macthPWD } = require("../utils/passwordComp");
const matchPWd = require("../utils/passwordComp");
const { unauthenticated } = require("../utils/cutomErrors");
const generateToken = require("../utils/tokens");
const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.roles = isFirstUser ? "admin" : "user";
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const validpwd = await matchPWd(password, user.password);
  if (!validpwd) {
    throw new unauthenticated("Invalid Credentials (password)");
  }
  const token = generateToken({
    id: user._id,
    name: user.name,
    role: user.roles,
  });
  const oneday = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    espires: new Date(Date.now() + oneday),
    secure: process.env.NODE_ENV === "production",
  });
  const { password: pwd, ...rest } = user._doc;
  res.status(StatusCodes.OK).json({ rest, token });
};
const logout = async (req, res) => {
     res.clearCookie("token");
     res.status(StatusCodes.OK).json({ msg: "logged out" });
}

module.exports = { register, login, logout };
