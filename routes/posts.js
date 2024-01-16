const express = require("express");
const router = express.Router();
const { Post, validate } = require("../models/post");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

// const storage = multer.diskStorage({
//   destination: "./uploads", // Specify the directory to store uploaded photos
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = path.extname(file.originalname);
//     cb(null, uniqueSuffix + extension);
//   },
// });

// const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const posts = await Post.find().sort("date");

  res.send(posts);
});

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const result = await cloudinary.uploader.upload(req.body.file, {
      folder: "posts",
    });

    res.send(result);
  } catch (ex) {
    console.log(ex);
  }

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // const user = await User.findById(req.user._id);
  // if (!user) return res.status(400).send("Invalide user.");

  // let post = new Post({
  //   topic: req.body.topic,
  //   description: req.body.description,
  //   photo_path: req.file.path,
  //   user: {
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     username: user.username,
  //     password: user.password,
  //   },
  // });

  // post = await post.save();

  // res.send(req.file.path);
});

module.exports = router;
