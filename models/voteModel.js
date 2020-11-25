
const db = require('./db');
module.exports ={

	insertVote: function(user, callback){
			var sql = "INSERT INTO votes VALUES  ('','"+user.voterId+"' , '"+user.eventId+"' ,  '"+user.value+"', current_timestamp() )";

			console.log(sql);

			db.execute(sql, function(status){
				callback(status);
			});
	},
	getLikeVote: function(id, callback){
			var sql = "SELECT COUNT(value)FROM votes WHERE value='1' and eventId ="+id;

			console.log(sql);

			db.execute(sql, function(status){
				callback(status);
			});
	},
	getDislikeVote: function(id, callback){
			var sql = "SELECT COUNT(value)FROM votes WHERE value='2' and eventId ="+id;

			console.log(sql);

			db.execute(sql, function(status){
				callback(status);
			});
	}
}