import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import config from "../../config";

const { JWT_SECRET } = config;

const router = express.Router();

// GET /api/user all users

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("no users");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});
// register,signup
// Post api/user
router.post("/", (req, res) => {
  console.log(req);
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Please fill out all blanks" });
  }
  if (password.length <= 7) {
    return res
      .status(400)
      .json({ msg: "Your password must be at least 8 character" });
  }

  // if existing user by using email
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({
        msg: "We think you are already a member or Try another E-mail",
      });

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // save to mongoDB
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            JWT_SECRET,
            // 3600s, can be used with "10d" or "10h"
            { expiresIn: "12h" },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

export default router;
