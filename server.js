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

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//TODO: Figure out what to do about helmet
// app.use(helmet())

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

