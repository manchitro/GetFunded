const express = require("express");
const bodyParser = require("body-parser");
const exSession = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.get('/', (req, res)=>{
	res.send('Hello from GetFunded');	
});

app.listen(4000, (error)=>{
	console.log('express server started at 4000...');
});