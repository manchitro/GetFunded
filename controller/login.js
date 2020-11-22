const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/" + req.session.user[0].userType);
  } else {
    var successMessage = req.query.success;

    res.render("login/index", { alert: successMessage });
  }
});

router.post("/", (req, res) => {
  var user = {
    uid: req.body.uid,
    password: req.body.password,
  };

  console.log(user);
  userModel.validate(user, function (gotUser) {
    if (gotUser) {
      res.cookie("uname", req.body.username);
      res.cookie("id", gotUser[0].id);
      req.session.user = gotUser;
      res.cookie("id", gotUser[0].id);
      if (gotUser[0].userType === "admin") {
        res.redirect("/admin");
      } else if (gotUser[0].userType === "user") {
        res.redirect("/user");
      } else if (gotUser[0].userType === "moderator") {
        res.redirect("/moderator");
      } else if (gotUser[0].userType === "userSupport") {
        res.redirect("/userSupport");
      }
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
