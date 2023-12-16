const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const mongodb = require('./Model/dbconnection');
const cors = require('cors');
//abs path 
const abspath = process.cwd();

//configuring env file
dotenv.config({ path: path.join(abspath, './Configuration/.env') });

//Defining fallback values:
const PORT_NO = process.env.PORT || 8081;


app.use(cors());
app.use('/', require('./Controller/Router/Router'))

app.listen(PORT_NO, () => {
    console.log("connected to Server", PORT_NO);
});