const db = require('./db');
module.exports ={

insertComment: function(user, callback){
		var sql = "INSERT INTO `comments`(`id`, `commenterId`, `eventId`, `commentText`, `createdAt`) VALUES ('','"+user.commenterId+"' , '"+user.eventId+"' ,  '"+user.commentText+"', current_timestamp())";

		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	}

}