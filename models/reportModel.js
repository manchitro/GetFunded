
const db = require('./db');
module.exports ={

	insertReport: function(user, callback){
			var sql = "INSERT INTO `reports`(`id`, `creatorId`, `eventId`, `message`, `createdAt`) VALUES  ('','"+user.creatorId+"' , '"+user.eventId+"' ,  '"+user.message+"', current_timestamp() )";

			//console.log(sql);

			db.execute(sql, function(status){
				callback(status);
			});
		}
	
}