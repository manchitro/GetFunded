const express = require('express');
const eventModel = require.main.require('./models/eventModel');
const userModel	= require.main.require('./models/userModel');
const messagesModel	= require.main.require('./models/messagesModel');
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

    router.get('/decline/:id', (req, res)=>{
        var data = req.params.id;
       
        eventModel.getById(data, function(results){
            res.render('moderator/decline', {decline : results});
        });
        });

        router.post('/decline/:id', (req, res)=>{
            var data = req.params.id;
            var message= req.body.message;
            var creatorId;
            eventModel.getById(data, function(results){
               creatorId= results[2];

            });

            messagesModel.insert(creatorId,message, function(status){
                if(status){
                    res.redirect('/moderator');
                }else{
                    res.redirect('moderator/decline/:id');
                }
            });

            eventModel.delete(data, function(status){
                if(status){
                    res.redirect('/moderator');
                }else{
                    res.redirect('moderator/decline/:id');
                }
            });
    
        
        })
        
    
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
