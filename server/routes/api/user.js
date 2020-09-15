import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import config from "../../config";
import auth from "../../middleware/auth";

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

// post /api/user/:userFirstName/profile
// edit profile
router.post("/:userFirstName/profile", auth, async (req, res) => {
  try {
    const { previousPassword, password, matchPassword, userId } = req.body;
    console.log(" Profile", req.body);
    const result = await User.findById(userId, "password");

    bcrypt.compare(previousPassword, result.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          match_msg: "It does not match current password",
        });
      } else {
        if (password === matchPassword) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              result.password = hash;
              result.save();
            });
          });
          res.status(200).json({
            success_msg: "you have successfully updated your password",
          });
        } else {
          res
            .status(400)``
            .json({ fail_msg: "New passwords does not match each other" });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
