const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	var errorMessage = req.query.error;

	res.render('signup/index', {alert: errorMessage})
})

router.post('/', (req, res)=>{

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

})

module.exports = router;