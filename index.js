import express from "express";
import mongoose from "mongoose";
import models from "./models/index.js";

const app = express();
app.use(express.json());

const url = "mongodb://localhost:27017/parcelkoi";
const options = {};
const connectWithDb = () => {
  mongoose.connect(url, options, (err, db) => {
    if (err) {
      console.error(err);
    } else log("Database connection established");
  });
};

connectWithDb();

const log = (msg) => console.log(msg);

const PORT = 3000;

app.get("/", (req, res) => {
  const params = JSON.stringify(req.query);
  res.send("hello world" + params);
});

app.post("/", (req, res) => {
  const body = req.body;
  const user = new models.User({
    username: body.username,
    createdAt: new Date(),
  });
  user
    .save()
    .then((savedUser) => {
      res.status(201).send("User saved id" + savedUser._id);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(PORT, () => {
  console.log("Listing to port" + PORT);
});
