require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfuly!");
  } catch (err) {
    res.status(400).send("Error saving user: ", err.message);
  }
});

// User API - GET /user get all the users from the database
app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const users = await User.find({emailId});

    if (users.length !== 0) {
      return res.send(users);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.body.userId);

    res.send("User deleted successfuly!");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection estabilshed!");

    app.listen(7777, () => {
      console.log("Server is started!");
    });
  })
  .catch((err) => {
    console.log("Database is not connected!");
  });
