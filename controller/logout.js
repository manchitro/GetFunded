const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
	//console.log(req.session.user);
	req.session.destroy();
	res.clearCookie('uname');
	// res.clearCookie('uname');

	res.redirect('/login');
});

router.get('/', (req, res)=>{
	console.log("destroying session");
	req.session.destroy();
	res.clearCookie('uname');
	// res.clearCookie('uname');
	res.redirect('/login');
})

module.exports = router;