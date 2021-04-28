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
    let states = JSON.parse(req.query.states);
    let cities = JSON.parse(req.query.cities);
    console.log(req.query.pincodes);
    let pincodes = JSON.parse(req.query.pincodes);
    try {
        let filterQuery = buildFilterQuery(states,cities, pincodes);
        let documents = await Provider.find(filterQuery).skip(start).limit(size).exec();
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

router.get("/filters/:filterField", async (req, res) => {
    let states = JSON.parse(req.query.states);
    let cities = JSON.parse(req.query.cities);
    let pincodes = JSON.parse(req.query.pincodes);
    let filterField = req.params.filterField;
    try {
        let filterQuery = buildFilterQuery(states,cities, pincodes);
        let aggregateQuery = buildAggregateQuery(filterField, filterQuery);
        let documents = await Provider.aggregate(aggregateQuery).exec();
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

/*router.get("/filters/city", async (req, res) => {
    let states = JSON.parse(req.query.states);
    let cities = JSON.parse(req.query.cities);
    try {
        let filterQuery = buildFilterQuery(states,cities);
        let aggregateQuery = buildAggregateQuery("City", filterQuery);
        let documents = await Provider.aggregate(aggregateQuery).exec();
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
})*/

function buildFilterQuery (states, cities, pincodes) {
    let filterQuery = {};
    if(states && states.length > 0){
        filterQuery.State = {$in:states}
    }
    if(cities && cities.length > 0){
        filterQuery.City = {$in:cities}
    }
    if(pincodes && pincodes.length > 0){
        filterQuery.PINCode = {$in:pincodes}
    }
    console.log(filterQuery);
    return filterQuery;
}

function buildAggregateQuery (aggregateField, filterQuery){
    let aggregateQuery = [
        {
            $match : filterQuery
        },
        {
            $group: {
                _id: "$" + aggregateField,
                totaldocs: {
                    $sum: 1
                }
            }
        }
    ]
    console.log(aggregateQuery);
    return aggregateQuery;
}

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