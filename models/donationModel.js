
const db = require('./db');
module.exports ={

	getAllDonation: function(id, callback){
		var sql = "select * from donations WHERE eventId="+id;
		db.getResults(sql, function(results){
			callback(results);
		});

	},

	insertDonate: function(user, callback){
			var sql = "INSERT INTO `donations`(`id`, `amount`, `donorId`, `eventId`, `donationMessage`, `createdAt`) VALUES ('','"+user.amount+"' , '"+user.donorId+"' , '"+user.eventId+"' ,  '"+user.donationMessage+"', current_timestamp())";

			//console.log(sql);

			db.execute(sql, function(status){
				callback(status);
			});
		}
}