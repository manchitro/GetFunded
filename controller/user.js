const express = require('express');
const userModel	= require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res)=>{
	res.render('user/userPage');
})

router.get('/viewEvents', (req, res)=>{
	userModel.getAllEvents(function(results){
		res.render('user/viewEvents', {eventlist: results});
	});	
})

router.get('/eventMore/:id', (req, res)=>{
	var data = req.params.id;

	userModel.getAllDonation(data,function(results){
		res.render('user/eventMore', {donatelist: results});
	});	
})

router.get('/createEvent', (req, res)=>{
	res.render('user/createEvent');	
})

router.get('/myEvent', (req, res)=>{
	res.render('user/myEvent');	
})

router.get('/eventEdit', (req, res)=>{
	res.render('user/eventEdit');	
})

router.get('/viewDonation', (req, res)=>{
	res.render('user/viewDonation');	
})

router.get('/donateToEvent/:id', (req, res)=>{
	res.render('user/donateToEvent');	
})


router.get('/reportToEvent/:id', (req, res)=>{
	res.render('user/reportToEvent');	
})

router.get('/commentToEvent/:id', (req, res)=>{
	res.render('user/commentToEvent');	
})

router.get('/voteToEvent/:id', (req, res)=>{
	res.render('user/voteToEvent');	
})

router.post('/createEvent/:id', (req, res)=>{
	var user = {

		eventName     : 	req.body.eventName,
		eventPicture  : 	req.body.eventPicture,
		creatorId     : 	res.cookie,
		description   : 	req.body.description,
		categoryId    : 	req.body.categoryId,
		goalAmount    : 	req.body.goalAmount,
		goalDate      : 	req.body.goalDate,
		isApproved    : 	req.body.isApproved
	}; 
	userModel.insertEvent(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('user/createEvent/:id');
		}
})
})


router.post('/reportToEvent/:id', (req, res)=>{
	var user = {
		creatorId: 	req.body.creatorId,
		eventId  : 	req.params.id,
		message  : 	req.body.report
	};
	userModel.insertReport(user, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('user/viewEvents/:id');
		}
})
})

router.post('/eventMore/:id', (req, res)=>{
	var user = {
		commenterId  : 	req.body.commenterId,
		eventId      : 	req.params.id,
		commentText  : 	req.body.comment
	};
	userModel.insertComment(user, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('user/eventMore/:id');
		}
})
})

router.post('/donateToEvent/:id', (req, res)=>{
	var user = {
		amount           : 	req.body.amount,
		donorId          : 	req.params.donorId,
		eventId          : 	req.body.id,
		donationMessage  : 	req.body.donationMessage
	};
	userModel.insertComment(user, function(status){
		if(status){
			res.redirect('/user/viewEvents');
		}else{
			res.redirect('user/donateToEvent/:id');
		}
})
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
