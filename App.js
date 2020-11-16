const express = require("express");
const bodyParser = require("body-parser");
const exSession = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.get('/', (req, res)=>{
	res.send('Hello from express server');	
});

app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});