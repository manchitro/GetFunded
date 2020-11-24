const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	var error;
	if (req.session.error !== null) {
		error = req.session.error;
	}
	console.log(error);

	req.session.error = null;

	var errorMessage = req.query.error;

	res.render('signup/index', {alert: errorMessage, error: error});
});

router.post('/', (req, res)=>{
	req.check('username', "Username too short!").isLength({ min: 3});
	var error = req.validationErrors();

	if (error) {
		req.session.error = error;
	}
	else{
		req.session.success = true;
	}

	if (req.session.error === null) {
		var user = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword,
			userType : "user"
		};
		
		userModel.insert(user, function(status){
			if(status){
				res.redirect('/login?success=' + encodeURIComponent('Account Created! Please login with your username and password'));
			}else{
				res.redirect('/signup?error=' + encodeURIComponent('SQL Error'));
			}
		});
	}else{
		res.redirect("/signup");
	}

	// var user = {
	// 	name: req.body.name,
	// 	username: req.body.username,
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	confirmPassword: req.body.confirmPassword,
	// 	userType : "user"
	// };
	
	// userModel.insert(user, function(status){
	// 	if(status){
	// 		res.redirect('/login?success=' + encodeURIComponent('Account Created! Please login with your username and password'));
	// 	}else{
	// 		res.redirect('/signup?error=' + encodeURIComponent('SQL Error'));
	// 	}
	// });
})

module.exports = router;