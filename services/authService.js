const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async ({ username, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error("Email đã tồn tại");
  }

  const passHash = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: passHash });
  return user;
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Tên đăng nhập không đúng");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("mật khẩu không đúng");
  }
  const token = await jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = { register, login };
