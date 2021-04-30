import SocialMedia from "./SocialMedia"
import React from 'react';
import '../css/Login.css'
import {Redirect} from "react-router-dom"
import '../css/ProviderCentral.css'
import Map from "mapmyindia-react";


export class ProviderCentral extends React.Component {

    constructor(props){
        super(props);
        console.log("ProviderCentral");
        this.state = {
            isUnauthorized: false,
            provider:{},
            isMapEnabled: false,
            latitude: 0,
            longitude: 0
        }
    }

    componentDidMount() {
        console.log("TEST");
        if ("geolocation" in navigator) {
            console.log("Available");
        } else {
            console.log("Not Available");
        }
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
        });
        console.log("Mount");
        fetch("/providers/current")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 401) {
                        this.setState({isUnauthorized: true});
                    } else {
                        console.log(res.json());
                    }
                }
            }).then((response) => {
                console.log(response);
                this.setState({provider: response.data});
            })
    }


    onToggleMap(event){
        this.setState({isMapEnabled: !this.state.isMapEnabled})
    }

    render() {
        if(this.state.isUnauthorized){
            return (<Redirect to="/login" />);
        } else {
            let provider = this.state.provider;
            console.log([this.state.latitude, this.state.longitude]);
            let markers = [];
            if(this.state.latitude !== 0 || this.state.longitude !== 0){
                markers.push({
                    position: [this.state.latitude, this.state.longitude],
                    draggable: true,
                    title: "Marker title",
                    onClick: (e,f) => {
                        console.log(e);
                        console.log("clicked ");
                    },
                    onDragend: (e,f) => {
                        console.log(e);
                        console.log("dragged");
                    }
                });
            }
            console.log("RENDER")
            return (
                <div id="page">
                    <section>
                        <div id="topscrollmessage" className="titleheader">
                        <span>
                            Provider Central
                        </span>
                        </div>
                    </section>
                    <section>
                        <button onClick={this.onToggleMap.bind(this)}>Toggle Map</button>
                        {this.state.isMapEnabled ? (<Map
                            center={[this.state.latitude, this.state.longitude]}
                            markers={markers}
                            onDblclick={(e)=>{console.log(e);console.log("DBL");this.setState({latitude:e.latlng.lat, longitude:e.latlng.lng})}}
                        />) : ""}
                        <div className="provider-central-details">
                            <div className="provider-central-details-table">
                                <div className="provider-central-detail-item provider-central-detail-contact">
                                    <div className="provider-key">Contact: </div><div className="provider-value">{provider.PrimaryContactNumberToPlaceOrder}</div>
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-name">
                                    <div className="provider-key">Name: </div><input className="provider-value" value={provider.Name}/>
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-contact">
                                    <div className="provider-key">PIN Code: </div><input className="provider-value" value={provider.PINCode}/>
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-deliveryareas">
                                    <div className="provider-key">Delivery Areas: </div><input className="provider-value" value={provider.DeliveryAreas} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-deliveryareas">
                                    <div className="provider-key">Delivery Radius: </div><input className="provider-value" value={provider.DeliveryRadius} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-deliveryoption">
                                    <div className="provider-key">DeliveryOptions: </div><input className="provider-value" value={provider.DeliveryOptions} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-menuoptions">
                                    <div className="provider-key">Menu Options: </div><input className="provider-value" value={provider.MenuOptions} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-mealoptions">
                                    <div className="provider-key">Meal Options: </div><input className="provider-value" value={provider.MealOptions} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-typeofservice">
                                    <div className="provider-key">Type of Service: </div><input className="provider-value" value={provider.ServiceType} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-availabledays">
                                    <div className="provider-key">Available Days: </div><input className="provider-value" value={provider.AvailableDays} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-avgprice">
                                    <div className="provider-key">Avg. price for 2: </div><input className="provider-value" value={provider.AverageMealPriceFor2People} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-preorder">
                                    <div className="provider-key">Pre-order Requirements: </div><input className="provider-value" value={provider["Pre-OrderRequirements"]} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-preorder">
                                        <div className="provider-key">Link to Menu/Website: </div><input className="provider-value" value={provider["LinkToMenu/website(ifAvailable)"]} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-preorder">
                                        <div className="provider-key">Additional Comments: </div><input className="provider-value" value={provider.Comments} />
                                </div>
                                <div className="provider-central-detail-item provider-central-detail-available">
                                    <div className="provider-key">Additional Comments: </div><input className="provider-value" value={provider.isAvailable} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <SocialMedia/>
                </div>
            );
        }
    }
}

export default ProviderCentral;
