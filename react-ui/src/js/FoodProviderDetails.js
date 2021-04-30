import React from "react";
import '../css/FoodProviderDetails.css'
import aboutLogo from "../logo_about.jpeg";
import SocialMedia from "./SocialMedia";

const whatsappText = encodeURI(
    "Hello 👋,\nI found your service through covifeedindia.com.\nI'd love to place an order.\n🥐🍞🥖🧋🍴🍎🫐🥭🥝"
);


export class FoodProviderDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = { providerDetails : {} };
    }

    componentDidMount() {
        console.log("COMPONENT DID");
        fetch("/providers/" + this.props.match.params.providerid)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        providerDetails: result.data
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        providers: {data:{}}
                    });
                }
            )
    }

    render() {
        let provider = this.state.providerDetails;
        return (
            <div id="page">
                <section>
                    <div className="provider-screen-title">
                        <div className="titleheader">
                            {this.state.providerDetails.Name}
                        </div>
                        <div className="provider-subheader">
                            {this.state.providerDetails.ServiceType}
                        </div>
                    </div>
                </section>
                <section>
                    <div className="provider-screen-contact">
                        <span className="contacticon">
                            <a href={"tel:"+provider.PrimaryContactNumberToPlaceOrder} className="contacticons"><i className="fa fa-phone" aria-hidden="true"/></a>
                        </span>
                        <span className="contacticon">
                                <a href={"https://api.whatsapp.com/send?phone=91"+ provider.PrimaryContactNumberToPlaceOrder + "&text=" + whatsappText + "&&app_absent=1"}  className="contacticons"><i className="fa fa-whatsapp" aria-hidden="true"/></a>
                        </span>
                    </div>
                </section>
                <section>
                    <div className="provider-screen-details">
                        <div className="provider-screen-details-table">
                            <div className="provider-detail-item provider-detail-contact">
                                <div className="provider-key">Contact: </div><div className="provider-value"><a href={"tel:"+provider.PrimaryContactNumberToPlaceOrder}>{provider.PrimaryContactNumberToPlaceOrder}</a></div>
                            </div>
                            <div className="provider-detail-item provider-detail-contact">
                                <div className="provider-key">PIN Code: </div><div className="provider-value">{provider.PINCode}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-deliveryareas">
                                <div className="provider-key">Delivery Areas: </div><div className="provider-value">{provider.DeliveryAreas}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-deliveryareas">
                                <div className="provider-key">Delivery Radius: </div><div className="provider-value">{provider.DeliveryRadius}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-city">
                                <div className="provider-key">Location: </div><div className="provider-value">{provider.City + ", " + provider.State}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-deliveryoption">
                                <div className="provider-key">DeliveryOptions: </div><div className="provider-value">{provider.DeliveryOptions}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-menuoptions">
                                <div className="provider-key">Menu Options: </div><div className="provider-value">{provider.MenuOptions}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-mealoptions">
                                <div className="provider-key">Meal Options: </div><div className="provider-value">{provider.MealOptions}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-typeofservice">
                                <div className="provider-key">Type of Service: </div><div className="provider-value">{provider.ServiceType}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-availabledays">
                                <div className="provider-key">Available Days: </div><div className="provider-value">{provider.AvailableDays}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-avgprice">
                                <div className="provider-key">Avg. price for 2: </div><div className="provider-value">{provider.AverageMealPriceFor2People}</div>
                            </div>
                            <div className="provider-detail-item provider-detail-preorder">
                                <div className="provider-key">Pre-order Requirements: </div><div className="provider-value">{provider["Pre-OrderRequirements"]}</div>
                            </div>
                            {
                                provider["LinkToMenu/website(ifAvailable)"] ? (<div className="provider-detail-item provider-detail-preorder">
                                    <div className="provider-key">Link to Menu/Website: </div><div className="provider-value">{provider["LinkToMenu/website(ifAvailable)"]}</div>
                                </div>):""
                            }
                            {
                                provider.Comments ? (<div className="provider-detail-item provider-detail-preorder">
                                    <div className="provider-key">Additional Comments: </div><div className="provider-value">{provider.Comments}</div>
                                </div>):""
                            }
                        </div>
                    </div>
                </section>
                <SocialMedia/>
            </div>
        );
    }


}


export default FoodProviderDetails;

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
 * */