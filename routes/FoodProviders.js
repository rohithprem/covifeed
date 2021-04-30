const express = require("express");
const router = express.Router();
const {connection} = require('./MongoDB')
let foodProvidersModel = require("../models/FoodProvider");

const Provider = connection.model('Provider', foodProvidersModel);

router.get("/count", async (req, res) => {
    try {
        let filterQuery = buildFilterQuery(req.query);
        let count = await Provider.count(filterQuery).exec();
        res.status(200).json({
            data: count
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
    let filterField = req.params.filterField;
    try {
        let filterQuery = buildFilterQuery(req.query);
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
});

router.get("/current", async (req,res) => {
    // if(req.session.user && req.cookies.user_sid){
        let loggedInUsername = req.session.user;
        try{
            let filter = {"PrimaryContactNumberToPlaceOrder":loggedInUsername ? loggedInUsername : "9871424973"};
            let userDoc = await Provider.findOne(filter).exec();
            console.log(userDoc);
            if(userDoc != null){
                res.status(200).json({
                    data: userDoc
                });
            } else {
                res.status(404).json({})
            }
        } catch(err){
            console.log(err);
            res.status(400).json({
                message: "Some error occured",
                err
            });
        }
    /*} else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }*/
})

router.get("/:number", async (req, res) => {
    let number = req.params.number;
    try {
        let document = await Provider.findOne({"PrimaryContactNumberToPlaceOrder":number}).exec();
        res.status(200).json({
            data: document
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.get("/", async (req, res) => {
    let size = Number(req.query.size);
    let start = Number(req.query.start);
    try {
        let filterQuery = buildFilterQuery(req.query);
        console.log(filterQuery);
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

function buildFilterQuery (query) {
    let states = JSON.parse(query.states);
    let cities = JSON.parse(query.cities);
    let pincodes = JSON.parse(query.pincodes);
    let nameSearch = query.namesearch;
    let isVegOnly = JSON.parse(query.isvegonly);
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
    if(nameSearch && nameSearch.length){
        filterQuery.Name = {$regex : ".*" + nameSearch + ".*"};
    }
    if(isVegOnly){
        filterQuery.MenuOptions = "Veg Only";
    }
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

module.exports = router;