const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
var session = require('express-session');

const render = require('./routes/render');
const crud = require('./routes/crud');
const user = require('./routes/user');

const port = 5000;

const app = express();



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
// const db = mysql.createConnection ({
//     host: 'localhost',
//     user: 'root2',
//     password: 'pswd',
//     database: 'bullseye'
// });

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
app.get('/login', render.login);//call for login page
app.get('/signup', render.signup);//call for signup page
app.get('/add', render.addPlayerPage);
app.get('/edit/:id', render.editPlayerPage);
app.get('/view/:id', render.viewPlayerPage);

app.get('/delete/:id', crud.deletePlayer);
app.post('/signup', user.signup);//call for signup post
app.post('/login', user.login);//call for login post

app.post('/add', crud.addPlayer);
app.post('/edit/:id', crud.editPlayer);
// app.post('/view/:id', crud.viewPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});