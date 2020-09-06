import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";
import User from "../../models/user";
const { JWT_SECRET } = config;

const router = express.Router();

// POST api/user ,login

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill out all the blanks" });
  }

  // check existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User is not valid" });

    //if user exists, check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Your password is not valid" });

      // if user login finally,
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "3days" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    });
  });
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});
//logout
router.post("/logout", (req, res) => {
  res.json("You are successfully logged out");
});

export default router;
