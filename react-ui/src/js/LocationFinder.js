import React from "react";
import '../css/LocationFinder.css';
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

export class LocationFinder extends React.Component {
    constructor(props) {
        console.log("CONSTRUCTOR");
        super(props);
        this.setState({
            isLoaded: false,
            providers: {data:[]},
            cityDropDown: [],
            stateDropDown: [],
            selectedCity: [],
            selectedState: []
        })
    }

    componentDidMount() {
        console.log("COMPONENT DID");
        fetch("/providers/?start=0&size=50")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(" DID TESTSTST");
                    console.log(result);
                    this.setState({
                        providers: result
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        providers: {data:[]}
                    });
                }
            )

        fetch("/providers/filters/city")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cityDropDown: this.prepareDropDownData(result.data)
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        cityDropDown: []
                    });
                }
            )

        fetch("/providers/filters/state")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        stateDropDown: this.prepareDropDownData(result.data)
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        stateDropDown: []
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
    * */
    cityOnChange(selectedValue){
        console.log("OnChange");
        console.log(selectedValue);
        // this.state.selectedFilter = selectedValue.value;
        this.setState({selectedCity: selectedValue? selectedValue : [] });
    }

    stateOnChange(selectedValue){
        console.log("OnChange");
        console.log(selectedValue);
        // this.state.selectedFilter = selectedValue.value;
        this.setState({selectedState: selectedValue? selectedValue : [] });
    }

    prepareDropDownData(dbArray){
        let dropdownItems = [];
        if(dbArray){
            dropdownItems = dbArray.map(function(dbItem, index){
                let dropDownItem = {
                    value: index+1,
                    label: dbItem._id,
                    totaldocs: dbItem.totaldocs
                };
                return dropDownItem;
            });
        }
        return dropdownItems;
    }

    render() {
        let cards;
        const options = [
            { label: "One", value: 1 , test:"ABCd"},
            { label: "Two", value: 2 , test:"ABCd123"},
            { label: "Three", value: 3, test:"ABCd4312"}
        ]
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
        console.log(this.state);
        let selectedCity = null
        let selectedState = null
        let cityDropDownList = [];
        let stateDropDownList = [];
        if(this.state){
            stateDropDownList = this.state.stateDropDown;
            cityDropDownList = this.state.cityDropDown;
            selectedCity = this.state.selectedCity;
            selectedState = this.state.selectedState;
        }
        return (
            <div id="locationfinder">
                <div id="providerfilters">
                    <VirtualizedSelect
                        options={stateDropDownList}
                        onChange={this.stateOnChange.bind(this)}
                        value={selectedState}
                        clearable={true}
                        multi={true}
                        searchable={true}

                    />
                    <VirtualizedSelect
                        options={cityDropDownList}
                        onChange={this.cityOnChange.bind(this)}
                        value={selectedCity}
                        clearable={true}
                        multi={true}
                        searchable={true}
                    />
                </div>
                <div id="providerslist">
                    {cards}
                </div>
            </div>
        );
    }
}

export default LocationFinder;
