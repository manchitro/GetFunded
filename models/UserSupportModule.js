const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from users where (username='"+user.uid+"' or email='"+user.uid+"') and password='"+user.password+"'";
		console.log(sql);
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
		
	},
	getById: function(id, callback){
		var sql = "select * from users WHERE id="+id;

        db.getResults(sql, function(results){
            callback(results);
        });

	},
	getAllEvents: function(callback){
		var sql = "select * from events";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAllDonation: function(id, callback){
		var sql = "select * from donations WHERE eventId="+id;
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into users (name, username, email, password, usertype, createdat) VALUES ('"+user.name+"' , '"+user.username+"' ,  '"+user.email+"' , '"+user.password+"' , '"+user.userType+"', current_timestamp() )";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},

	insertEvent: function(user, callback){
		var sql = "INSERT INTO `events` VALUES ('','"+user.eventName+"' ,'"+user.eventPicture+"', '"+user.creatorId+"' ,  '"+user.description+"','"+user.categoryId+"' , '"+user.goalAmount+"' ,'"+user.goalDate+"' , '"+user.isApproved+"'  , current_timestamp() )";



		db.execute(sql, function(status){
			callback(status);
		});
	},
	insertReport: function(user, callback){
		var sql = "INSERT INTO `reports`(`id`, `creatorId`, `eventId`, `message`, `createdAt`) VALUES  ('','"+user.creatorId+"' , '"+user.eventId+"' ,  '"+user.message+"', current_timestamp() )";

		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	insertComment: function(user, callback){
		var sql = "INSERT INTO `comments`(`id`, `commenterId`, `eventId`, `commentText`, `createdAt`) VALUES ('','"+user.commenterId+"' , '"+user.eventId+"' ,  '"+user.commentText+"', current_timestamp())";

		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},

	insertDonate: function(user, callback){
		var sql = "INSERT INTO `donations`(`id`, `amount`, `donorId`, `eventId`, `donationMessage`, `createdAt`) VALUES ('','"+user.amount+"' , '"+user.donorId+"' , '"+user.eventId+"' ,  '"+user.donationMessage+"', current_timestamp())";

		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		//var sql = "update user set ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		var sql= "UPDATE users SET name='"+user.name+"', username ='"+user.username +"', email='"+user.email +"' where id="+user.id;
		//console.log(sql);
        //console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id="+id;
        db.execute(sql, function(status){
            callback(status);
        });

	}
}