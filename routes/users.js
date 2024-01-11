const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");

  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  let token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      name: user.name,
      email: user.email,
    });
});

module.exports = router;
