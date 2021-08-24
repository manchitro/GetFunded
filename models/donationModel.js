
const db = require('./db');
module.exports ={

	getAllDonation: function(id, callback){
		var sql = "select * from donations WHERE eventId="+id;
		db.getResults(sql, function(results){
			callback(results);
		});

	},

	getReport: function(callback){
		var sql = "SELECT eventId, SUM(amount) AS sumfund FROM donations GROUP BY eventId";
		db.getResults(sql, function(results){
			callback(results);
		});

	},


	insertDonation: function(donation, callback){
		var sql = "INSERT INTO donations(amount, donorId, eventId, donationMessage, createdAt) VALUES ('"+donation.amount+"','"+donation.donorId+"','"+donation.eventId+"', '"+donation.message+"', current_timestamp())";
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

	getAllDonationByEventId: function(eventId, callback){
		sql = "SELECT * FROM donations where eventId = " + eventId;

		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getDonationSumByEventId: function(eventId, callback){
		sql="SELECT sum(amount) as sumAmount FROM donations WHERE eventId="+eventId;

		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAllDonationSumGroupedByEvent(callback){
		sql = "select sum(ifnull(d.amount,0)) as sumAmount from donations d RIGHT JOIN events e on e.id=d.eventId GROUP by d.eventid order by e.id";

		db.getResults(sql, function(results){
			callback(results);
		});
	}
}

