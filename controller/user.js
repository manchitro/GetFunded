const express = require('express');
const userModel	= require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		res.render('user/userPage');
	}else{
		res.redirect('/login');
	}
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
