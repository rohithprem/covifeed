import React from "react";
import SocialMedia from "./SocialMedia";

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

export class LocationFinder extends React.Component {
    constructor(props) {
        super(props);
        // Connection URL
        var url = 'mongodb+srv://covifeed:covifeed123@cluster0.vgqja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        // Database Name
        var dbName = 'test';
        var collectionName = 'test'
        var client = new MongoClient(url);
        // Use connect method to connect to the server
        client.connect(function(err) {
            assert.equal(null, err);
            console.log('Connected successfully to server');
            const db = client.db(dbName);
            client.close();
        });
        this.state = {mongoClient: client}
    }

    render() {
        return (
            <div id="test">
                <section>
                    <div id="topscrollmessage" className="titleheader">
                    <span>
                        About
                    </span>
                    </div>
                </section>
                <section>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                </section>
                <SocialMedia/>
            </div>
        );
    }
}

export default LocationFinder;
