const express = require('express');
const userModel	= require.main.require('./models/userModel');
const eventModel = require.main.require('./models/eventModel');
const commentModel = require.main.require('./models/commentModel');
const donationModel = require.main.require('./models/donationModel');
const reportModel = require.main.require('./models/reportModel');
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



router.post('/createEvent/:id', (req, res)=>{
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
		creatorId	: 	req.body.creatorId,
		description : 	req.body.description,
		categoryId	: 	req.body.categoryId,
		goalAmount  : 	req.body.goalAmount,
		goalDate	: 	req.body.goalDate,
		data        :   req.params.id
	};
	eventModel.updateAll(user, function(status){
		if(status){
			res.redirect('/user/myEvent');
		}else{
			res.redirect('/user/eventEdit/:id');
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

	donationModel.getAllDonation(data,function(results){
		console.log(results);
		res.render('user/eventDonate', {donationlist: results});
	});

});

router.get('/viewDonation', (req, res)=>{
	res.render('user/viewDonation');	
});


router.get('/donateToEvent/:id', (req, res)=>{
	res.render('user/donateToEvent');	
});
router.post('/donateToEvent/:id', (req, res)=>{
	var user = {
		amount           : 	req.body.amount,
		donorId          : 	req.params.id,
		eventId          : 	req.body.id,
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





module.exports = router;