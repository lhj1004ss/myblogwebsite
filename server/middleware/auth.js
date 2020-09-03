import jwt from "jsonwebtoken";
import config from "../config/index";
const { JWT_SECRET } = config;
// whem login /api/auth
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json({ msg: "No same token available" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "token is not valid" });
  }
};

export default auth;
