const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/socialMediaDb")
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
