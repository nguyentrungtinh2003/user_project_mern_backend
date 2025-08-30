const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Không có token" });

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      if (roles.length && !roles.includes(decode.role)) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
  };
};

module.exports = authMiddleware;
