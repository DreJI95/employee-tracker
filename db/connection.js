const mysql = require('mysql2');

//Connect to the database
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', //Your MySQL username
    password: '', //Your MySQL password
    database: 'business_cms'
},console.log('Connected to the business_cms database'));

module.exports = db;