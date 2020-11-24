const db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from messages WHERE id="+id;

        db.getResults(sql, function(results){
            callback(results);
        });

	},
	getAll: function(callback){
		var sql = "select * from messages";
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

	insert: function(senderId, receiverId, message, callback){
		var sql = "insert into messages (senderId, receiverId, messageText, createdAt) VALUES ('"+senderId+"' , '"+receiverId+"' , '"+message+"', current_timestamp() )";
		
		console.log("Sql--",sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(id, message, callback){
		//var sql = "update user set ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		var sql= "UPDATE messages SET messageText = '"+message+"' where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM messages WHERE id="+id;
        db.execute(sql, function(status){
            callback(status);
        });
	}
}