const db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from messages WHERE id="+id;
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


	insert: function(senderId, receiverId, message, callback){
		var sql = "insert into messages (senderId, receiverId, messageText, createdAt) VALUES ('"+senderId+"' , '"+receiverId+"' , '"+message+"', current_timestamp() )";
		console.log("Sql--",sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	insertMessage: function(user, callback){
		var sql = "insert into messages VALUES ('','"+user.senderId+"' , '"+user.receiverId+"' , '"+user.messageText+"', current_timestamp() )";
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
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id="+id;
        db.execute(sql, function(status){
            callback(status);
        });

	},
	deleteMessage: function(id, callback){
		var sql = "DELETE FROM messages WHERE id="+id;
        db.execute(sql, function(status){
            callback(status);
        });
	},
	getAllMessageById: function(user, callback){
		var sql = "SELECT * FROM `messages` WHERE senderId = '"+user.senderId+"' AND receiverId ='"+user.receiverId+"' UNION SELECT * FROM `messages` WHERE senderId = '"+user.receiverId+"' AND receiverId ='"+user.senderId+"' ORDER by id";

        db.getResults(sql, function(results){
            callback(results);
        });
	}
}