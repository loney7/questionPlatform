const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');


const render = require('./routes/render');
const crud = require('./routes/crud');

const port = 5000;

const app = express();
// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'pswd',
    database: 'bullseye'
});

// // connect to database
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to database');
// });
// global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', render.Index);
app.get('/add', render.addPlayerPage);
app.get('/edit/:id', render.editPlayerPage);
app.get('/view/:id', render.viewPlayerPage);

app.get('/delete/:id', crud.deletePlayer);

app.post('/add', crud.addPlayer);
app.post('/edit/:id', crud.editPlayer);
// app.post('/view/:id', crud.viewPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});