const express = require("express");
const eventModel = require.main.require("./models/eventModel");
const userModel = require.main.require("./models/UserModel");
const messagesModel = require.main.require("./models/messagesModel");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "moderator") {
      var EventList;
      var ud;
      userModel.getByUname(req.session.user[0].userName, function (results) {
        //res.render("moderator/index", { EventList: results });
        ud = results;

        eventModel.getAll(function (results) {
          // results.forEach((item,index)=>{
          //   var gd=results[index].goalDate;
          //   var cd=results[index].createdAt;
          //    cd= cd.slice(0, 13);
          //    gd= gd.slice(0, 13);
          //    results[index].goalDate=gd;
          //    results[index].createdAt=cd;
          // });

          el = results;
          res.render("moderator/index", { EventList: el, userData: ud });
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/modify/:id", (req, res) => {
  var data2 = req.params.id;

  eventModel.getById(data2, function (results) {
    res.render("events/modifyEvent", { modify: results });
  });
});

router.post("/modify/:id", (req, res) => {
  var event = {
    data: req.params.id,
    eventName: req.body.eventName,
    description: req.body.description,
    categoryId: req.body.categoryId,
    goalAmount: req.body.goalAmount,
    goalDate: req.body.goalDate,
  };
  console.log(event);
  if (
    event.data != "" &&
    event.eventName != "" &&
    event.description != "" &&
    event.categoryId != "" &&
    event.goalAmount != "" &&
    event.goalDate != ""
  ) {
    eventModel.updateAll(event, function (status) {
      if (status) {
        eventModel.getAll(function (results) {
          // res.render('moderator/index', { EventList : results});
          res.redirect("/moderator");
        });
      } else {
        res.redirect(event.data);
      }
    });
  } else {
    res.redirect(event.data);
  }
});

router.get("/approve/:id", (req, res) => {
  var data2 = req.params.id;

  eventModel.getById(data2, function (results) {
    res.render("moderator/approve", { approve: results });
  });
});

router.get("/decline/:id", (req, res) => {
  var data = req.params.id;

  eventModel.getById(data, function (results) {
    res.render("moderator/decline", { decline: results });
  });
});



router.post("/approve/:id", (req, res) => {
  var user = {
    data: req.params.id,
  };
  eventModel.update(user, function (status) {
    if (status) {
      eventModel.getAll(function (results) {
        // res.render('moderator/index', { EventList : results});
        res.redirect("/moderator");
      });
    } else {
      res.redirect(user.data);
    }
  });
});

router.get("/approve/:id", (req, res) => {
  var data = req.params.id;

  eventModel.getById(data, function (results) {
    res.render("moderator/approve", { approve: results });
  });
});

router.get("/decline/:id", (req, res) => {
  var data = req.params.id;

  eventModel.getById(data, function (results) {
    res.render("moderator/decline", { decline: results });
  });
});

router.post("/decline/:id", (req, res) => {
  var data = req.params.id;
  var messages = req.body.message;
  var creatorId;
  eventModel.getById(data, function (results) {
    creatorId = results[2];
  });
  
  if (messages !== '') {
    messagesModel.insert(creatorId, messages, function (status) {
      if (status) {
        eventModel.delete(data, function (status) {
          if (status) {
            res.redirect("/moderator");
          } else {
            res.redirect(data);
          }
        });

        //res.redirect('/moderator');
      } else {
        res.redirect(data);
      }
    });
  } else {
    res.redirect(data);
  }
});

router.post("/approve/:id", (req, res) => {
  var user = {
    data: req.params.id,
  };
  eventModel.update(user, function (status) {
    if (status) {
      eventModel.getAll(function (results) {
        // res.render('moderator/index', { EventList : results});
        res.redirect("/moderator");
      });
    } else {
      res.redirect(user.data);
    }
  });
});

module.exports = router;
