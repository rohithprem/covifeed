const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user = new Schema({
    "number": "string",
    "emailid": "string",
    "saltedPassword": "string"
});

module.exports = user;