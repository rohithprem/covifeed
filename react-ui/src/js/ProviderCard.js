import React from "react";
import '../css/ProviderCard.css'

const whatsappText = encodeURI(
    "Hello 👋,\nI found your service through covifeedindia.com.\nI'd love to place an order.\n🥐🍞🥖🧋🍴🍎🫐🥭🥝"
);

export class ProviderCard extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickProvider(contactNumber, event){
        window.open("/foodprovider/" + contactNumber, "_self");
    }

    render(){
        let index = this.props.index;
        let provider = this.props.provider;

        return (
            <div className="providercard" id={"providercard-" + index}>
                <div onClick={this.onClickProvider.bind(this, provider.PrimaryContactNumberToPlaceOrder)}  className="providercarddetails-table">
                    <div className="providercarddetail card-name">
                        <div className="provider-key">Name: </div><div className="provider-value">{provider.Name}</div>
                    </div>
                    <div className="providercarddetail card-contact">
                        <div className="provider-key">Contact: </div><div className="provider-value"><a href={"tel:"+provider.PrimaryContactNumberToPlaceOrder}>{provider.PrimaryContactNumberToPlaceOrder}</a></div>
                    </div>
                    <div className="providercarddetail card-contact">
                        <div className="provider-key">PIN Code: </div><div className="provider-value">{provider.PINCode}</div>
                    </div>
                    <div className="providercarddetail card-deliveryareas">
                        <div className="provider-key">DeliveryAreas: </div><div className="provider-value">{provider.DeliveryAreas}</div>
                    </div>
                    <div className="providercarddetail card-city">
                        <div className="provider-key">Location: </div><div className="provider-value">{provider.City + ", " + provider.State}</div>
                    </div>
                    <div className="providercarddetail card-deliveryoption">
                        <div className="provider-key">DeliveryOptions: </div><div className="provider-value">{provider.DeliveryOptions}</div>
                    </div>
                    <div className="providercarddetail card-menuoptions">
                        <div className="provider-key">Menu Options: </div><div className="provider-value">{provider.MenuOptions}</div>
                    </div>
                    <div className="providercarddetail card-mealoptions">
                        <div className="provider-key">MealOptions: </div><div className="provider-value">{provider.MealOptions}</div>
                    </div>
                    <div className="providercarddetail card-typeofservice">
                        <div className="provider-key">Type of Service: </div><div className="provider-value">{provider.ServiceType}</div>
                    </div>
                    <div className="providercarddetail card-availabledays">
                        <div className="provider-key">Available Days: </div><div className="provider-value">{provider.AvailableDays}</div>
                    </div>
                    <div className="providercarddetail card-avgprice">
                        <div className="provider-key">Avg. price for 2: </div><div className="provider-value">{provider.AverageMealPriceFor2People}</div>
                    </div>
                </div>
                <div className="providercontact">
                            <span>
                                <a href={"tel:"+provider.PrimaryContactNumberToPlaceOrder} className="contacticons"><i className="fa fa-phone" aria-hidden="true"/></a>
                            </span>
                    <span>
                                <a href={"https://api.whatsapp.com/send?phone=91"+ provider.PrimaryContactNumberToPlaceOrder + "&text=" + whatsappText + "&&app_absent=1"}  className="contacticons"><i className="fa fa-whatsapp" aria-hidden="true"/></a>
                            </span>
                </div>
            </div>)
    }


}


export default ProviderCard;

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