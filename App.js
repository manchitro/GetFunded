//declaration
const express = require("express");
const bodyParser = require("body-parser");
const exSession = require("express-session");
const cookieParser = require("cookie-parser");
const login = require("./controller/login");
const signup = require("./controller/signup");
const logout = require("./controller/logout");
const user = require("./controller/user");
const admin = require("./controller/admin");
const moderator = require("./controller/moderator");
const userSupport = require("./controller/userSupport");
const app = express();

//config
app.set("view engine", "ejs");

//middleware
app.use("/abc", express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  exSession({
    secret: "my secret value",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cookieParser());

app.use("/login", login);
app.use("/signup", signup);
app.use("/logout", logout);
app.use("/user", user);
app.use("/moderator", moderator);
app.use("/admin", admin);
app.use("/userSupport", userSupport);

//route
app.get("/", (req, res) => {
  res.redirect("/login");
});

//server startup
app.listen(4000, (error) => {
  console.log("express server started at 4000...");
});
