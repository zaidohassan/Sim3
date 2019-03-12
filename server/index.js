require("dotenv").config();
const { json } = require("body-parser");
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const { register, login, getUser } = require("./controller");
const {
  createPost,
  getAllPosts,
  indvPost,
  getOnePost
} = require("./postcontroller");
const { postSearch } = require("./postSearch");

const port = 4000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

app.use(json());
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    console.log("Database Connected");
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/user", getUser);
app.post("/api/createPost/", createPost);
app.get("/api/getAllPosts", getAllPosts);
app.get("/api/posts", postSearch);
app.get("/api/getIndvPost/:id", indvPost);
app.get("/api/getPost/:id", getOnePost);

app.listen(port, () => console.log(`Listening on Port ${port}`));
