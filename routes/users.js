const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  user = await user.save();

  res.send(user);
});

module.exports = router;
