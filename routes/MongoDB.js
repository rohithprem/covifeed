const mongoose = require('mongoose');


/*const connection = mongoose.createConnection(
    'mongodb+srv://cluster0.vgqja.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    {
        dbName:"covifeed",
        ssl: true,
        sslValidate: false
        /!*sslCA: require('fs').readFileSync(`${__dirname}/../resources/X509-cert-6003728960027512154.pem`),
        useUnifiedTopology: true*!/
    }
);*/

const connection = mongoose.createConnection(
    'mongodb+srv://covifeed:AgQM4WYiIzx4IS74@cluster0.vgqja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        dbName:"covifeed"
    }
);

/*console.log("TEST");
Provider.find({"EmailAddress": "deepti.official@gmail.com"}).exec(showData);

function showData(err, res){
    console.log("Result:" + res)
    console.log("Error:" + err)
}*/

module.exports = {connection};