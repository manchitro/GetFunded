const express = require('express');
const userModel	= require.main.require('./models/userModel');
const eventModel = require.main.require('./models/eventModel');
const commentModel = require.main.require('./models/commentModel');
const donationModel = require.main.require('./models/donationModel');
const reportModel = require.main.require('./models/reportModel');
const messagesModel = require.main.require('./models/messagesModel');
const voteModel = require.main.require('./models/voteModel');
const router = express.Router();


router.get('/', (req, res)=>{
	res.render('user/userPage');
});

router.get('/viewEvents', (req, res)=>{
	eventModel.getAllEvents(function(results){
		res.render('user/viewEvents', {eventlist: results});
	});	
});


router.get('/createEvent', (req, res)=>{
	res.render('user/createEvent');	
})


router.post('/createEvent', (req, res)=>{
	var user = {
		eventName     : 	req.body.eventName,
		eventPicture  : 	req.body.eventPicture,
		creatorId     : 	req.cookies['id'],
		description   : 	req.body.description,
		categoryId    : 	req.body.categoryId,
		goalAmount    : 	req.body.goalAmount,
		goalDate      : 	req.body.goalDate
	}; 
	eventModel.insertEvent(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('/user/createEvent');
		}
	});
});

router.get('/myEvent', (req, res)=>{
	var creatorId = req.cookies['id'];
    //res.send(data);
    eventModel.getAllMyEvents(creatorId, function(results){
		console.log(results);
        res.render('user/myEvent', {myEventlist : results});
    });
	
});

router.post('/myEvent', (req, res)=>{
	eventModel.approve(function(status){
		if(status){
			res.redirect('/user/viewEvent');
		}else{
			res.redirect('/user/myEvent');
		}
	});
});

router.get('/eventEdit/:id', (req, res)=>{
	var data = req.params.id;
    //res.send(data);
    eventModel.getById(data, function(results){
		console.log(results);
        res.render('user/eventEdit', {editlist : results});
    });

	
});

router.post('/eventEdit/:id', (req, res)=>{
	var user = {
		eventName   : 	req.body.eventName,
		eventPicture: 	req.body.eventPicture,
		creatorId	: 	req.cookies['id'],
		description : 	req.body.description,
		categoryId	: 	req.body.categoryId,
		goalAmount  : 	req.body.goalAmount,
		goalDate	: 	req.body.goalDate,
		data        :   req.params.id
	};
	eventModel.updateAll(user, function(status){
		if(status){
			res.redirect('/user/viewEvent');
		}else{
			res.redirect('/user/eventEdit/user.data?dataBase_problem');
		}
	});
});

router.get('/eventDelete/:id', (req, res)=>{
	var data = req.params.id;
    //res.send(data);
    eventModel.getById(data, function(results){
		console.log(results);
        res.render('user/eventDelete', {deletelist : results});
    });
	
});
router.post('/eventDelete/:id', (req, res)=>{
    var data = req.params.id;

	eventModel.deleteEvent(data, function(status){
		if(status){
			res.redirect('/user/myEvent');
		}else{
			res.redirect('/user/eventDelete/:id');
		}
	});
});
router.get('/eventDonate/:id', (req, res)=>{
	var data = req.params.id;

	donationModel.getApprovedDonation(data,function(results){
		console.log(results);
		res.render('user/eventDonate', {donationlist: results});
	});

});

router.get('/donateToEvent/:id', (req, res)=>{
	var data = req.params.id;

	donationModel.getAllDonation(data,function(results){
		console.log(results);
		res.render('user/donateToEvent',{donationlist: results});
	});

});

router.post('/donateToEvent/:id', (req, res)=>{
	var user = {
		amount           : 	req.body.amount,
		donorId          : 	req.cookies['id'],
		eventId          : 	req.params.id,
		donationMessage  : 	req.body.donationMessage
	};
	donationModel.insertDonate(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('/user/donateToEvent/:id');
		}
});
});
router.get('/reportToEvent/:id', (req, res)=>{
	res.render('user/reportToEvent');	
});

router.post('/reportToEvent/:id', (req, res)=>{
	var user = {
		creatorId: 	req.cookies['id'],
		eventId  : 	req.params.id,
		message  : 	req.body.report
	};
	reportModel.insertReport(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('/user/reportToEvent/:id');
		}
	});
});

router.get('/commentToEvent/:id', (req, res)=>{
	res.render('user/commentToEvent');	
})

router.post('/commentToEvent/:id', (req, res)=>{

	var user = {
		commenterId  : 	req.cookies['id'],
		eventId      : 	req.params.id,
		commentText  : 	req.body.comment
	};
	commentModel.insertComment(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('/user/commentToEvent/:id');
		}
	});
});


router.get('/voteToEvent/:id', (req, res)=>{
	res.render('user/voteToEvent');	
});

router.post('/voteToEvent/:id', (req, res)=>{

	var user = {
		voterId  : 	req.cookies['id'],
		eventId  : 	req.params.id,
		value    : 	req.body.vote
	};
	voteModel.insertVote(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('/user/voteToEvent/:id');
		}
	});
});

router.get('/approveDonation/:id', (req, res)=>{
	var data = req.params.id;

	donationModel.getNotApprovedDonation(data,function(results){
		console.log(results);
		res.render('user/approveDonation',{donationlist: results});
	});

});
router.post('/approveDonation/:id',(req,res)=>{
	var data = req.params.id;

	donationModel.approve(data,function(status){
		if (status) {
			res.redirect('/user/myEvent');
		}else{
			res.redirect('/user/approveDonation?sql_error!!');
		}
	});
});


router.get('/message', (req, res)=>{
    userModel.getAllUserSupport(function(results){
    console.log(results);
        res.render('user/message', {msgUserlist : results});
    });
})
router.get("/view", (req, res) => {
  userModel.getAllUserSupport(function (results) {
    if(results){
      res.status(200).json(results);
    }
    else{
      res.json({status:'error'});
    }
  });
});
router.get('/messageToUserSupport/:id',(req, res)=>{
		var user = {
		    senderId   : req.params.id,
		    receiverId : req.cookies['id']
    }
    messagesModel.getAllMessageById(user,function(results){
    console.log(results);
        res.render('user/messageToUserSupport', {msgToUserlist : results});
    });
})
router.post('/messageToUserSupport/:id',(req,res)=>{
	var user = {
			messageText: req.body.messageToUs,
		    senderId   : req.cookies['id'],
		    receiverId : req.params.id
		}
	messagesModel.insertMessage(user,function(status){
		if (status) {
			res.redirect('/user/message');
		}else{
			res.redirect('/user/messageToUserSupport?sql_error!!');
		}
	});
});

module.exports = router;