const db = require('./db');

module.exports ={

	validate: function(user, callback){
		
		
	},
	getById: function(id, callback){
		var sql = "select * from events WHERE id="+id;

        db.getResults(sql, function(results){
            callback(results);
        });

	},
	getAll: function(callback){
		var sql = "select * from events";
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
	update: function(user, callback){
		//var sql = "update user set ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		var sql= "UPDATE events SET isApproved = 1 where id="+user.data;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	updateAll: function(event, callback){
		//var sql = "update events set ('', '"+event.eventName+"' ,'', '"+event.description+"' , '"+event.categoryId+"', '"+event.goalAmount+"', '"+"','','') where id="+event.data;
		var sql= "UPDATE events SET eventName='"+event.eventName+"', description ='"+event.description +"', categoryId="+event.categoryId +", goalAmount='"+event.goalAmount +"' ,goalDate='"+event.goalDate+"' where id="+event.data;
		//var sql= "UPDATE events SET isApproved = 1 where id="+user.data;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	delete: function(id, callback){
		var sql = "DELETE FROM events WHERE id="+id;
        db.execute(sql, function(status){
            callback(status);
        });

	}
}