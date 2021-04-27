const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
let foodProvidersModel = require("../models/Models");

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

const Provider = connection.model('Provider', foodProvidersModel);
/*console.log("TEST");
Provider.find({"EmailAddress": "deepti.official@gmail.com"}).exec(showData);

function showData(err, res){
    console.log("Result:" + res)
    console.log("Error:" + err)
}*/

router.get("/", async (req, res) => {
    let size = Number(req.query.size);
    let start = Number(req.query.start);
    console.log(size);
    console.log(start);
    try {
        let documents = await Provider.find().skip(start).limit(size).exec();
        res.status(200).json({
            data: documents
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.get("/filters/state", async (req, res) => {
    try {
        let documents = await Provider.aggregate([{
            $group: {
                _id: "$State",
                totaldocs: {
                    $sum: 1
                }
            }
        }]).exec();
        res.status(200).json({
            data: documents
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
})

router.get("/filters/city", async (req, res) => {
    try {
        let documents = await Provider.aggregate([{
            $group: {
                _id: "$City",
                totaldocs: {
                    $sum: 1
                }
            }
        }]).exec();
        res.status(200).json({
            data: documents
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
})

/*router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        //let player = players.find(player => player._id === id);
        res.status(200).json({
            data: {"id":"PLAYER" + id}
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});*/

module.exports = router;