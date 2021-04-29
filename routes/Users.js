const express = require("express");
const router = express.Router();
let userModel = require("../models/User");
const {connection} = require('./MongoDB')

const User = connection.model('User', userModel);
/*router.get("/", async (req, res) => {
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
});*/

router.get("/exists/:phonenumber", async (req,res) => {
    let phoneNumber = Number(req.params.phonenumber);
    let isFound = false;
    let isPasswordExists = false;
    try{
        let filter = {"number":phoneNumber};
        let userDoc = await User.findOne(filter).exec();
        if(userDoc != null){
            isFound = true;
            let password = userDoc.saltedPassword;
            if(password){
                isPasswordExists = true;
            }
        }
        res.status(200).json({
            isFound: isFound,
            isPasswordExists: isPasswordExists
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }

})

router.get("/checkemailid/:phonenumber", async (req,res) => {
    let phoneNumber = Number(req.params.phonenumber);
    console.log(phoneNumber)
    let isFound = false;
    let isEmailIdPresent = false;
    try{
        let filter = {"number":phoneNumber};
        console.log(JSON.stringify(filter));
        let userDoc = await User.findOne(filter).exec();
        console.log(userDoc);
        if(userDoc != null){
            isFound = true;
            let emailId = userDoc.emailid;
            console.log(emailId)
            if(emailId != null && emailId !== ""){
                isEmailIdPresent = true;
            }
        }
        res.status(200).json({
            isFound: isFound,
            isEmailIdPresent : isEmailIdPresent
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }

})

module.exports = router;
