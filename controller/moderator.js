const express = require("express");
const eventModel = require.main.require("./models/eventModel");
const userModel = require.main.require("./models/userModel");
const messagesModel = require.main.require("./models/messagesModel");
const router = express.Router();

router.get("/", (req, res) => {
  eventModel.getAll(function (results) {
    res.render("moderator/index", { EventList: results });
  });
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
    eventName   : req.body.eventName,
    description : req.body.description,
    categoryId  : req.body.categoryId,
    goalAmount  : req.body.goalAmount,
    goalDate    : req.body.goalDate
  };
  eventModel.updateAll(event, function (status) {
    if (status) {
      eventModel.getAll(function (results) {
        // res.render('moderator/index', { EventList : results});
        res.redirect("/moderator");
      });
    } else {
      res.redirect("events/modify/:id");
    }
  });
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

router.post("/decline/:id", (req, res) => {
  var data = req.params.id;
  var message = req.body.message;
  var creatorId;
  eventModel.getById(data, function (results) {
    creatorId = results[2];
  });

  messagesModel.insert(creatorId, message, function (status) {
    if (status) {
        eventModel.delete(data, function (status) {
            if (status) {
              res.redirect("/moderator");
            } else {
              res.redirect("moderator/decline/:id");
            }
          });
      //  res.redirect("/moderator");
    } else {
      res.redirect("moderator/decline/:id");
    }
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
      res.redirect("moderator/approve/:id");
    }
  });
});

module.exports = router;
