import mongoose from 'mongoose';

const express = require("express");
const router = express.Router();

var promise = mongoose.connect('mongodb+srv://covifeed:covifeed123@cluster0.vgqja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


let players = require("../dummyDatabase");

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