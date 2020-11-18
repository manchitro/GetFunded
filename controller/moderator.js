const express = require('express');
const eventModel = require.main.require('./models/eventModel');
const userModel	= require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res)=>{
    
 eventModel.getAll(function(results){
    res.render('moderator/index', { EventList : results});

 });   
 
})

router.get('/approve/:id', (req, res)=>{
	var data = req.params.id;
   
    eventModel.getById(data, function(results){
        res.render('moderator/approve', {approve : results});
    });
    });
    
    router.post('/approve/:id', (req, res)=>{


    
        var user = {
            data    :   req.params.id
        };
        eventModel.update(user, function(status){
            if(status){
                eventModel.getAll(function(results){
                   // res.render('moderator/index', { EventList : results});
                    res.redirect('/moderator');
                 }); 
            }else{
                res.redirect('moderator/approve/:id');
            }
    
    })
    })
	

module.exports = router;
