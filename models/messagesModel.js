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

	getBySenderAndReceiver: function (senderId, receiverId, callback){
		var sql = "select * from messages where senderId='"+senderId+"' and receiverId='"+receiverId+"'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(sId,rId,message, callback){
		console.log("sid",sId);
		console.log("rid",rId);

		var sql = "insert into messages (senderId,receiverId, messageText, createdAt) VALUES ("+sId+" , "+rId+" ,  '"+message+"', current_timestamp() )";
		
		console.log("Sql--",sql);

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
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id="+id;
        db.execute(sql, function(status){
            callback(status);
        });

	}
}