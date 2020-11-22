const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from users where (username='"+user.uid+"' or email='"+user.uid+"') and password='"+user.password+"'";
		//console.log(sql);
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from users WHERE id="+id;

        db.getResults(sql, function(results){
            callback(results);
        });

	},

	getByUname: function(Uname, callback){
		var sql = "select * from users WHERE userName='"+Uname+"'";

        db.getResults(sql, function(results){
            callback(results);
        });

	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAllByUserType: function(userType, callback){
		var sql = "select * from users where userType='" + userType + "'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllEvents: function(callback){
		var sql = "select * from events";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAllDonation: function(id, callback){
		var sql = "select * from donations WHERE eventId="+id;
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
		var sql= "UPDATE users SET name='"+user.name+"', username ='"+user.username +"', email='"+user.email +"' where id="+user.id;
		//console.log(sql);
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