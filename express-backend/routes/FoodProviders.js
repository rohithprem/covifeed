const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const connection = mongoose.createConnection('mongodb+srv://covifeed:covifeed123@cluster0.vgqja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {dbName:"covifeed"});

let foodProvidersModel = require("../models/Models");
//let players = require("../dummyDatabase");
const Provider = connection.model('Provider', foodProvidersModel);
console.log("TEST");
Provider.find({"EmailAddress": "deepti.official@gmail.com"}).exec(showData);

function showData(err, res){
    console.log("Result:" + res)
    console.log("Error:" + err)
}

router.get("/list", async (req, res) => {
    try {
        res.status(200).json({
            data: players
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        let player = players.find(player => player._id === id);
        res.status(200).json({
            data: player
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

module.exports = router;