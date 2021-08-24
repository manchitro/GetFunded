const express = require("express");
const userModel = require.main.require("./models/userModel");
const userSupportModel = require.main.require("./models/UserSupportModel");
const eventModel = require.main.require("./models/eventModel");
const donationModel = require.main.require("./models/donationModel");
const messagesModel = require.main.require("./models/messagesModel");
const router = express.Router();

router.get('/', (req, res)=>{
  if(req.session.user != null){
    res.render('userSupport/index',{success : "No notifications yet!" });
  }else{
    res.redirect('/login');
  }
})

router.get('/userSupport', (req, res)=>{
  if(req.cookies['uname'] != null){
   if(req.query.success){
     res.render('userSupport/index',{success : req.query.success});
   }
   else{
        res.render('userSupport/index',{success : "No notifications yet"});
   } 
   
  }else{
    res.redirect('/userSupport/index');
  }
})

router.get('/allUser', (req, res)=>{
	userModel.getAll(function(results){
		console.log(results);
		res.render('userSupport/allUser', {userlist: results});
	});
});
router.get('/viewEvents', (req, res)=>{
  if(req.cookies['uname'] != null){
    eventModel.getAllEvents(function(results){
    console.log(results);
    res.render('userSupport/viewEvents', {eventlist: results});
  });
  }else{
    res.redirect('/login');
  }
})
router.get('/viewEvents', (req, res)=>{
  eventModel.getUserEvents(function(results){
    console.log(results);
    res.render('userSupport/viewEvents', {eventlist: results});
  });
});
router.get('/userEvents/:id', (req, res)=>{
  var data = req.params.id;
  eventModel.getAllMyEvents(data, function(results){
    console.log(results);
    res.render('userSupport/userEvents', {userEventlist: results});
  });
});
router.get('/eventDonation/:id', (req, res)=>{
  var data = req.params.id;
    //res.send(data);
    donationModel.getAllDonation(data, function(results){
    console.log(results);
        res.render('userSupport/eventDonation', {donationlist : results});
    });
})

router.get("/donateToEvent/:id", (req, res) => {
  res.render("userSupport/donateToEvent");
});
router.post('/eventDonation/:id', (req, res)=>{
  var a = req.body.amount;
  var d = req.cookies['id'];
  var e = req.body.donationMessage;

 if((a>0) && (d>0) && (e.length > 0)){
  var user = {
    amount         :   a,
    donorId        :   d,
    eventId        :   req.params.id,
    donationMessage:   e
  };

  donationModel.insertDonate(user, function(status){
    if(status){
      res.redirect('/userSupport/userSupport' + "?success=" + encodeURIComponent("Donation received!"));
    }else{
      res.redirect('/userSupport/donateToEvent/user.eventId');
    }
  });
 }
 else
 {
  res.redirect('/userSupport?please_fillup_the_form_first!!');
  return false;
 }
  
})

router.get('/message', (req, res)=>{
    userModel.getAll(function(results){
    console.log(results);
        res.render('userSupport/message', {userlist : results});
    });
})

router.get('/messageBox/:id', (req, res)=>{
  var user = {
    senderId   : req.params.id,
    receiverId : req.cookies['id']
  }
  messagesModel.getAllMessageById(user,function(results){
  console.log(results);
      res.render('userSupport/messageBox', {messagelist : results});
  });
})
router.post('/messageBox/:id',(req,res)=>{
  var user = {
      messageText: req.body.messageText,
      senderId   : req.cookies['id'],
      receiverId : req.params.id
    }
  messagesModel.insertMessage(user,function(status){
    if (status) {
      res.redirect('/userSupport/message');
    }else{
      res.redirect('/userSupport/messageBox?sql_error!!');
    }
  });
});

router.get("/view", (req, res) => {
  //console.log("clicckkkeeeeed");
  eventModel.getAllApprove(function (results) {
  //console.log(results);
    if(results){
      var r =results;
      res.status(200).json(results);
    }
    else{
      res.json({status:'error'});
    }
  });
});

router.get('/myProfile', (req, res)=>{
  var id = req.cookies['id'];
    userModel.getById(id,function(results){
    console.log(results);
        res.render('userSupport/myProfile', {profilelist : results});
    });
})
router.get('/editProfile', (req, res)=>{
  var id = req.cookies['id'];
    userModel.getById(id,function(results){
    console.log(results);
        res.render('userSupport/editProfile', {profilelist : results});
    });
})
router.post('/editProfile',(req,res)=>{
  var user = {
    name     : req.body.name,
    userName : req.body.userName,
    email    : req.body.email,
    password : req.body.password,
    image    : req.body.image,
    id       : req.cookies['id']
  }
  userModel.updateUser(user,function(status){
    if (status) {
      res.redirect('/userSupport/myProfile');
    }else{
      res.redirect('/userSupport/editProfile?sql_error!!');
    }
  });
});
router.get('/userDetails/:id', (req, res)=>{
  var data = req.params.id;

  userModel.getById(data,function(userResults){
    eventModel.countEventbyId(data,function(eventResults){
      console.log(userResults);
      console.log(eventResults);
      res.render('userSupport/userDetails', {users: userResults, events: eventResults});
       });
    });
})

router.get('/deleteMessage/:id', (req, res)=>{
  var id = req.params.id;
    messagesModel.getById(id,function(results){
    console.log(results);
        res.render('userSupport/deleteMessage', {messagelist : results});
    });
})
router.post('/deleteMessage/:id',(req,res)=>{
  var data = req.params.id;
  messagesModel.deleteMessage(data,function(status){
    if (status) {
      res.redirect('/userSupport/message');
    }else{
      res.redirect('/userSupport?sql_error!!');
    }
  });
});

router.get('/pinMessage/:id', (req, res)=>{
  var data = req.params.id;
    messagesModel.getById(data,function(results){
    console.log("haaaaaaaaa");
        res.render('userSupport/pinMessage',{meslist: results});
    });
})

module.exports = router;