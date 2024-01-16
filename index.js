const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/posts");
const auth = require("./routes/auth");
const cors = require("cors");
const config = require("config");
const multer = require("multer");

const upload = multer();

if (!config.get("jwtPrivateKey")) {
  console.log("FATA ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/socialMediaDb")
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(cors()); // Enable CORS for all routes

app.use(upload.any());

app.use(express.json());

app.use("/api/users", users);

app.use("/api/posts", posts);

app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
