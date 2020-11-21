const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();
const moment = require("moment");

router.get("/", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      res.render("admin/index");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/", (req, res) => {});

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post("/login", (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
    userType: "admin",
  };

  userModel.validate(user, function (status) {
    if (status) {
      res.cookie("uname", req.body.username);
      res.redirect("/home");
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/moderators", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getAllByUserType("moderator", function (results) {
        //console.log(results);
        res.render("admin/moderators", {
          modList: results,
          moment: moment,
          successMessage: req.query.success,
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/moderators/add", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      res.render("admin/moderatorAdd", { errorMessage: req.query.error });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/moderators/add", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      //   console.log(req.body.name + "here");
      var moderator = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userType: "moderator",
      };

      if (moderator.password === moderator.confirmPassword) {
        userModel.insert(moderator, function (status) {
          if (status) {
            res.redirect(
              "/admin/moderators?success=" +
                encodeURIComponent("Moderator Added!")
            );
          } else {
            res.redirect(
              "/admin/moderators/add?error=" + encodeURIComponent("SQL Error")
            );
          }
        });
      } else {
        res.redirect(
          "/admin/moderators/add?error=" +
            encodeURIComponent("Passwords do not match")
        );
      }
      console.log(moderator);
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/moderators/edit/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getById(req.params.id, function (result) {
        console.log(result);
        res.render("admin/moderatorEdit", {
          moderator: result[0],
          errorMessage: req.query.error,
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/moderators/edit", (req, res) => {
  if (req.session.user) {
    if (req.session.user[0].userType === "admin") {
      var moderator = {
		id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      userModel.update(moderator, function (status) {
        if (status) {
          res.redirect(
            "/admin/moderators?success=" +
              encodeURIComponent("Moderator Edited!")
          );
        } else {
          res.redirect(
            "/admin/moderators?error=" + encodeURIComponent("SQL Error")
          );
        }
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/moderators/delete/:id", (req, res) => {
	if (req.session.user) {
	  // console.log(req.session.user[0].userType);
	  if (req.session.user[0].userType === "admin") {
		userModel.delete(req.params.id, function(status){
			if (status) {
				res.redirect(
				  "/admin/moderators?success=" +
					encodeURIComponent("Moderator deleted!")
				);
			  } else {
				res.redirect(
				  "/admin/moderators?error=" + encodeURIComponent("SQL Error")
				);
			  }
		});
	  } else {
		res.redirect("/");
	  }
	} else {
	  res.redirect("/login");
	}
  });

module.exports = router;
