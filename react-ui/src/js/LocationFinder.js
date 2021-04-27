import React from "react";
import '../css/LocationFinder.css';

export class LocationFinder extends React.Component {
    constructor(props) {
        console.log("CONSTRUCTOR");
        super(props);
        this.setState({
            isLoaded: false,
            providers: {data:[]}
        })
    }

    /*componentWillMount() {
        console.log("COMPONENT WILL");
        this.setState({
            isLoaded: false,
            providers: []
        })
        fetch("/providers/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("WILL TESTSTST");
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        providers: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }*/

    componentDidMount() {
        console.log("COMPONENT DID");
        fetch("/providers/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(" DID TESTSTST");
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        providers: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    /*
    * "AlternativeContact": "string",
    "AvailableDays": "string",
    "AverageMealPriceFor2People": "string",
    "City": "string",
    "City_user": "string",
    "City_user_entered_old": "string",
    "Comments": "string",
    "DeliveryAreas": "string",
    "DeliveryOptions": "string",
    "DeliveryRadius": "string",
    "EmailAddress": "string",
    "EmailAddress_1": "string",
    "LinkToMenu/website(ifAvailable)": "string",
    "MealOptions": "string",
    "MenuOptions": "string",
    "Name": "string",
    "PINCode": "string",
    "PaymentOptions": "string",
    "Pre-OrderRequirements": "string",
    "PrimaryContactNumberToPlaceOrder": "string",
    "ServiceType": "string",
    "State": "string",
    "State_user": "string",
    "Timestamp": "string"
    * */
    render() {
        let cards;
        if(this.state && this.state.providers){
            let providers = this.state.providers.data;
            cards = providers.map(function(provider, index){
                return (
                    <div className="providercard" id={"providercard-" + index}>
                        <div className="providercarddetails-table">
                            <div className="providercarddetail card-name">
                                <div className="provider-key">Name: </div><div className="provider-value">{provider.Name}</div>
                            </div>
                            <div className="providercarddetail card-contact">
                                <div className="provider-key">Contact: </div><div className="provider-value">{provider.PrimaryContactNumberToPlaceOrder}</div>
                            </div>
                            <div className="providercarddetail card-city">
                                <div className="provider-key">City: </div><div className="provider-value">{provider.City}</div>
                            </div>
                            <div className="providercarddetail card-state">
                                <div className="provider-key">State: </div><div className="provider-value">{provider.State}</div>
                            </div>
                            <div className="providercarddetail card-deliveryoption">
                                <div className="provider-key">DeliveryOptions: </div><div className="provider-value">{provider.DeliveryOptions}</div>
                            </div>
                            <div className="providercarddetail card-deliveryareas">
                                <div className="provider-key">DeliveryAreas: </div><div className="provider-value">{provider.DeliveryAreas}</div>
                            </div>
                            <div className="providercarddetail card-mealoptions">
                                <div className="provider-key">MealOptions: </div><div className="provider-value">{provider.MealOptions}</div>
                            </div>
                        </div>
                        <div className="providercontact">
                            <span>
                                <a href={"tel:"+provider.PrimaryContactNumberToPlaceOrder} className="contacticons"><i className="fa fa-phone" aria-hidden="true"/></a>
                            </span>
                            <span>
                                <a href={"https://api.whatsapp.com/send?phone=91"+ provider.PrimaryContactNumberToPlaceOrder}  className="contacticons"><i className="fa fa-whatsapp" aria-hidden="true"/></a>
                            </span>
                        </div>
                </div>)
            });
        }
        console.log(cards)
        return (
            <div id="locationfinder">
                {cards}
            </div>
        );
    }
}

export default LocationFinder;
