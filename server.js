const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Model
const Post = require("./models/Post");

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/simple-mern",
  () => console.log("MongoDB is connected")
);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get all of our posts
app.get("/api/posts", (req, res) => {
  Post.find({}).then(posts => {
    res.json(posts);
  });
});

// Get One of Our posts
app.get("/api/posts/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    res.json(post);
  });
});

// Create and Update post
app.post("/api/posts", (req, res) => {
  const data = {
    title: req.body.title,
    content: req.body.content
  };
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (post) {
      Post.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
        updated => {
          res.json(updated);
        }
      );
    } else {
      Post.create(data).then(created => {
        res.json(created);
      });
    }
  });
});

// Delete selected post
app.post("/api/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(post => {
    res.json({ message: "Your post was deleted!" });
  });
});

app.listen(3333, () => console.log("Server is running on port 3333"));
