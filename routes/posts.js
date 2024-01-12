const express = require("express");
const router = express.Router();
const { Post, validate } = require("../models/post");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort("date");

  res.send(posts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalide user.");

  let post = new Post({
    topic: req.body.topic,
    description: req.body.description,
    photo_path: req.body.photo_path,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
    },
  });

  post = await post.save();

  res.send(post);
});

module.exports = router;
