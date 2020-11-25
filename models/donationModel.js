
const db = require('./db');
module.exports ={

	getAllDonation: function(id, callback){
		var sql = "select * from donations WHERE eventId="+id;
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insertDonate: function(user, callback){
			var sql = "INSERT INTO `donations` VALUES ('','"+user.amount+"' , '"+user.donorId+"' , '"+user.eventId+"' ,  '"+user.donationMessage+"', current_timestamp(), '0')";
			//console.log(sql);
			db.execute(sql, function(status){
				callback(status);
			});
	},
	getNotApprovedDonation: function(id,callback){
		var sql = "SELECT * FROM `donations` WHERE eventId = "+id+" and isApprove ='0'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getApprovedDonation: function(id,callback){
		var sql = "SELECT * FROM `donations` WHERE eventId = "+id+" and isApprove ='1'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	approve: function(id,callback){
		var sql = "UPDATE `donations` SET `isApprove`=1 WHERE `eventId`= "+id;
		db.getResults(sql,function(results){
			callback(results);
		});
	}
}