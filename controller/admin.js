const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();

router.get("/", (req, res) => {
	if (req.session.user) {
		// console.log(req.session.user[0].userType);
		if (req.session.user[0].userType === "admin") {
			res.render("admin/index");
		}
		else{
			res.redirect("/");
		}
	}
	else{
		res.redirect("/login");
	}
});

router.get("/", (req, res) => {
	
});

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post("/login", (req, res) => {
    var user = {
		username: req.body.username,
        password: req.body.password,
        userType: "admin"
	};

	userModel.validate(user, function(status){
		if(status){
			res.cookie('uname', req.body.username);
			res.redirect('/home');	
		}else{
			res.redirect('/login');
		}
	});
});

router.post('/logout')

module.exports = router;
