const express = require("express");
const userModel = require.main.require("./models/userModel");
const eventModel = require.main.require("./models/eventModel");
const messageModel = require.main.require("./models/messagesModel");
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
      userModel.delete(req.params.id, function (status) {
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

router.get("/usersupports", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getAllByUserType("userSupport", function (results) {
        //console.log(results);
        res.render("admin/usersupports", {
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

router.get("/userSupports/add", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      res.render("admin/userSupportAdd", { errorMessage: req.query.error });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/userSupports/add", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      //   console.log(req.body.name + "here");
      var userSupport = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userType: "userSupport",
      };

      if (userSupport.password === userSupport.confirmPassword) {
        userModel.insert(userSupport, function (status) {
          if (status) {
            res.redirect(
              "/admin/userSupports?success=" +
                encodeURIComponent("User Support Added!")
            );
          } else {
            res.redirect(
              "/admin/userSupports/add?error=" + encodeURIComponent("SQL Error")
            );
          }
        });
      } else {
        res.redirect(
          "/admin/userSupports/add?error=" +
            encodeURIComponent("Passwords do not match")
        );
      }
      console.log(userSupport);
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/usersupports/edit/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getById(req.params.id, function (result) {
        console.log(result);
        res.render("admin/userSupportEdit", {
          userSupport: result[0],
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

router.post("/userSupports/edit", (req, res) => {
  if (req.session.user) {
    if (req.session.user[0].userType === "admin") {
      var userSupport = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      userModel.update(userSupport, function (status) {
        if (status) {
          res.redirect(
            "/admin/userSupports?success=" +
              encodeURIComponent("User Support Edited!")
          );
        } else {
          res.redirect(
            "/admin/userSupports?error=" + encodeURIComponent("SQL Error")
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

router.get("/userSupports/delete/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.delete(req.params.id, function (status) {
        if (status) {
          res.redirect(
            "/admin/userSupports?success=" +
              encodeURIComponent("User Support deleted!")
          );
        } else {
          res.redirect(
            "/admin/userSupports?error=" + encodeURIComponent("SQL Error")
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

router.get("/users", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getAllByUserType("user", function (results) {
        //console.log(results);
        res.render("admin/users", {
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

router.get("/users/add", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      res.render("admin/userAdd", { errorMessage: req.query.error });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/users/add", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      //   console.log(req.body.name + "here");
      var user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userType: "user",
      };

      if (user.password === user.confirmPassword) {
        userModel.insert(user, function (status) {
          if (status) {
            res.redirect(
              "/admin/users?success=" + encodeURIComponent("User Added!")
            );
          } else {
            res.redirect(
              "/admin/users/add?error=" + encodeURIComponent("SQL Error")
            );
          }
        });
      } else {
        res.redirect(
          "/admin/users/add?error=" +
            encodeURIComponent("Passwords do not match")
        );
      }
      console.log(user);
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/users/edit/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getById(req.params.id, function (result) {
        console.log(result);
        res.render("admin/userEdit", {
          user: result[0],
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

router.post("/users/edit", (req, res) => {
  if (req.session.user) {
    if (req.session.user[0].userType === "admin") {
      var user = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      userModel.update(user, function (status) {
        if (status) {
          res.redirect(
            "/admin/users?success=" + encodeURIComponent("User Edited!")
          );
        } else {
          res.redirect("/admin/users?error=" + encodeURIComponent("SQL Error"));
        }
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/users/delete/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.delete(req.params.id, function (status) {
        if (status) {
          res.redirect(
            "/admin/users?success=" + encodeURIComponent("User deleted!")
          );
        } else {
          res.redirect("/admin/users?error=" + encodeURIComponent("SQL Error"));
        }
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/events", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      eventModel.getAll(function (result) {
        res.render("admin/events", {
          errorMessage: req.query.error,
          successMessage: req.query.success,
          eventList: result,
          moment: moment,
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/events/approve/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      eventId = req.params.id;
      eventModel.approve(eventId, function (status) {
        if (status) {
          res.redirect(
            "/admin/events?success=" + encodeURIComponent("Event approved!")
          );
        } else {
          res.redirect(
            "/admin/events?error=" + encodeURIComponent("SQL Error!")
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

router.get("/events/decline/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      eventId = req.params.id;
      eventModel.decline(eventId, function (status) {
        if (status) {
          res.redirect(
            "/admin/events?success=" + encodeURIComponent("Event declined!")
          );
        } else {
          res.redirect(
            "/admin/events?error=" + encodeURIComponent("SQL Error!")
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

router.get("/events/edit/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      eventModel.getById(req.params.id, function (result) {
        //console.log(result);
        res.render("admin/eventEdit", {
          event: result[0],
          errorMessage: req.query.error,
          moment: moment,
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/events/edit", (req, res) => {
  if (req.session.user) {
    if (req.session.user[0].userType === "admin") {
      var event = {
        data: req.body.id,
        eventName: req.body.eventName,
        description: req.body.description,
        goalAmount: req.body.goalAmount,
        goalDate: req.body.goalDate,
        categoryId: req.body.categoryId,
      };
      console.log(req.body.description);
      eventModel.updateAll(event, function (status) {
        if (status) {
          res.redirect(
            "/admin/events?success=" + encodeURIComponent("Event Edited!")
          );
        } else {
          res.redirect(
            "/admin/events?error=" + encodeURIComponent("SQL Error")
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

router.get("/events/delete/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      eventModel.delete(req.params.id, function (status) {
        if (status) {
          res.redirect(
            "/admin/events?success=" + encodeURIComponent("Event deleted!")
          );
        } else {
          res.redirect(
            "/admin/events?error=" + encodeURIComponent("SQL Error")
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

router.get("/messages", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      res.render("admin/messages");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/messages/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "admin") {
      userModel.getById(req.params.id, function (resultUser){
        messageModel.getBySenderAndReceiver(req.session.user[0].id, req.params.id, function (resultRightMessages){
          messageModel.getBySenderAndReceiver(req.params.id, req.session.user[0].id, function (resultLeftMessages){
            for (let i = 0; i < resultLeftMessages.length; i++) {
              resultLeftMessages[i].side = "float-left";
            }
            for (let i = 0; i < resultRightMessages.length; i++) {
              resultRightMessages[i].side = "float-right";
            }
            
            var messages = resultLeftMessages.concat(resultRightMessages);

            var sortedMessages =messages.sort((a,b) => b.createdAt - a.createdAt);
            var reversedSortedMessages = sortedMessages.reverse();
            console.log(messages);
            var gotUser = resultUser[0];
            res.render("admin/messagesConvo", {user: gotUser, messages: reversedSortedMessages});
          })
        })
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
