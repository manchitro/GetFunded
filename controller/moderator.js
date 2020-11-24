const express = require("express");
const eventModel = require.main.require("./models/eventModel");
const userModel = require.main.require("./models/UserModel");
const messagesModel = require.main.require("./models/messagesModel");
const donationModel = require.main.require("./models/donationModel");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
   // console.log(req.session.user[0].userType);
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
          res.render("moderator/index", { EventList: el, userData: ud, success : req.query.success });
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

// router.get("/decline/:id", (req, res) => {
//   var data = req.params.id;

//   eventModel.getById(data, function (results) {
//     res.render("moderator/decline", { decline: results });
//   });
// });



router.post("/approve/:id", (req, res) => {
  var user = {
    data: req.params.id,
  };
  eventModel.update(user, function (status) {
    if (status) {
      res.redirect("/moderator");
      // eventModel.getAll(function (results) {
      //   // res.render('moderator/index', { EventList : results});
      //   res.redirect("/moderator");
      // });
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
  var sid = req.session.user[0].id;
  var messages = req.body.message;
  var cId;
  eventModel.getById(data, function (results) {
    cId = results[0].creatorId;
    console.log("cid full--",results)
    
    //console.log("cid--",creatorId)

    if (messages !== '') {
      console.log("cid full--",cId)
      messagesModel.insert(sid,cId, messages, function (status) {
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

router.get("/feed", (req, res) => {
  var data = req.params.id;
  console.log("clicckkkeeeeed");
  eventModel.getAllApprove(function (results) {
//console.log(results);
    if(results){
      var r =results;
      
     // res.json({status: 'success'},{results : results } );
      res.status(200).json(results);
    }
    else{
      res.json({status:'error'});
    }
  });
});

router.get("/excelsheet", (req, res) => {
  //var data = req.params.id;
  console.log("clicckkkeeeeed--excel");
  donationModel.getReport(function (results) {
//console.log(results);
    if(results){
     console.log(results);
      
     // res.json({status: 'success'},{results : results } );
      res.status(200).json(results);
    }
    else{
      res.json({status:'error'});
    }
  });
});

router.get("/msg/:id", (req, res) => {
  console.log("Mssssssssssggggggggg");
  rId= req.params.id;
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "moderator") {
      
        messagesModel.getBySenderAndReceiver(req.session.user[0].id, rId, function (resultRightMessages){

         messagesModel.getBySenderAndReceiver(rId, req.session.user[0].id, function (resultLeftMessages){

            for (let i = 0; i < resultLeftMessages.length; i++) {
              resultLeftMessages[i].side = "float-left";
            }
            for (let i = 0; i < resultRightMessages.length; i++) {
              resultRightMessages[i].side = "float-right; padding-left:70px;";
            }
            console.log(resultLeftMessages);
            console.log(resultRightMessages);
            var messages = resultLeftMessages.concat(resultRightMessages);
            //var selfId = req.session.id;
            var sortedMessages =messages.sort((a,b) => b.createdAt - a.createdAt);
            var reversedSortedMessages = sortedMessages.reverse();
            //console.log(reversedSortedMessages);
            //var gotUser = resultUser[0];
            //res.render("admin/messagesConvo", {user: gotUser, messages: reversedSortedMessages, selfId: selfId});
            res.status(200).json(reversedSortedMessages);

          })
        })
      
    } else {
      res.json({status:'error'});
      //res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/donate/:id", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "moderator") {
      eventModel.getById(req.params.id, function(result){
        res.render("moderator/donate", {event: result[0]});
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/donate", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userType);
    if (req.session.user[0].userType === "moderator") {
      var donation = {
        amount: req.body.amount,
        donorId: req.session.user[0].id,
        eventId: req.body.eventId,
        message: req.body.message
      };
      console.log(donation);
      donationModel.insertDonation(donation, function(status){
        if (status) {
          res.redirect('/moderator' + "?success=" + encodeURIComponent("Donation received!"));
        }
        else{
          res.redirect('/moderator' + "?error=" + encodeURIComponent("SQL Error!"));
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
