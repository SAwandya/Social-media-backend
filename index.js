const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/posts");
const cors = require("cors");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.log("FATA ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/socialMediaDb")
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use("/api/users", users);

app.use("/api/posts", posts);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
