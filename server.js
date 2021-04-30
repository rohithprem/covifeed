const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3002;
const FoodProviders = require("./routes/FoodProviders");
const Users = require("./routes/Users");
const helmet = require('helmet')
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const upload = multer();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//TODO: Figure out what to do about helmet
// app.use(helmet())
app.use(express.static('public'));
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'COVIFEDD_SECRET_RAND',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});



//Route all static files here
app.use('/files', express.static(__dirname + '/react-ui/build/'))
app.use("/providers", FoodProviders);
app.use("/users", Users);


app.get("/*", returnIndexPage);

//Initiate REST Calls
app.listen(port, function() {
    console.log("Runnning on " + port);
});

async function returnIndexPage(req, res){
    try {
        res.sendFile(__dirname + '/react-ui/build/index.html');
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
}

module.exports = app;

