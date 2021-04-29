const express = require("express");
const router = express.Router();
const {connection} = require('./MongoDB')
let foodProvidersModel = require("../models/FoodProvider");

const Provider = connection.model('Provider', foodProvidersModel);

router.get("/count", async (req, res) => {
    try {
        let filterQuery = buildFilterQuery(req.query);
        let count = await Provider.count(filterQuery).exec();
        console.log("Count: " + count);
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
})

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