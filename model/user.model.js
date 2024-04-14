const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "my city",
    },
    roles: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar:String,
    avatarPublicId :String
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.po

const User = mongoose.model("User", userSchema);
module.exports = User;
