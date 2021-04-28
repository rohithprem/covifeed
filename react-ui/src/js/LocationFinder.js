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
        this.state = {
            isLoaded: false,
            providers: {data:[]},
            cityDropDown: [],
            stateDropDown: [],
            selectedCity: [],
            selectedState: [],
            filterquery: {city:[], state: []}
        }
    }

    componentDidMount() {
        console.log("COMPONENT DID");
        this.fetchData();
    }

    fetchData(){
        fetch("/providers/?start=0&size=50&states=" + JSON.stringify(this.state.filterquery.state) + "&cities=" + JSON.stringify(this.state.filterquery.city))
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

        fetch("/providers/filters/city?states=" + JSON.stringify(this.state.filterquery.state) + "&cities=" + JSON.stringify(this.state.filterquery.city))
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

        fetch("/providers/filters/state?states=" + JSON.stringify(this.state.filterquery.state) + "&cities=" + JSON.stringify(this.state.filterquery.city))
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
        let citiesSelected = selectedValue.map(function(values, index){
            return values.label;
        });
        let filterquery = this.state.filterquery;
        if(!filterquery){
            filterquery = {city:[], state:[]}
        }
        filterquery.city = citiesSelected;
        this.setState({
            selectedCity: selectedValue? selectedValue : [],
            filterquery: filterquery
        });
        this.fetchData();
    }

    stateOnChange(selectedValue){
        console.log("OnChange");
        console.log(selectedValue);
        // this.state.selectedFilter = selectedValue.value;
        let statesSelected = selectedValue.map(function(values, index){
            return values.label;
        });
        let filterquery = this.state.filterquery;
        if(!filterquery){
            filterquery = {city:[], state:[]}
        }
        filterquery.state = statesSelected;
        this.setState({
            selectedState: selectedValue? selectedValue : [],
            filterquery: filterquery
        });
        this.fetchData();
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

    createCards(providers){
        // let providers = this.state.providers.data;
        let cards = providers.map(function(provider, index){
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
        return cards;
    }

    render() {
        console.log("RENDER");
        console.log(this.state);
        let cards = [];
        let selectedCity = null
        let selectedState = null
        let cityDropDownList = [];
        let stateDropDownList = [];
        if(this.state){
            stateDropDownList = this.state.stateDropDown;
            cityDropDownList = this.state.cityDropDown;
            selectedCity = this.state.selectedCity;
            selectedState = this.state.selectedState;
            if(this.state.providers){
                cards = this.createCards(this.state.providers.data);
            }
        }
        return (
            <div id="locationfinder">
                <div id="providerfilters">
                    <div id="providerfilter-state" className="providerfilterdiv">
                        <span className="providerfilterlabel">State</span>
                        <span className="providerfilterdropdown">
                            <VirtualizedSelect
                                options={stateDropDownList}
                                onChange={this.stateOnChange.bind(this)}
                                value={selectedState}
                                clearable={true}
                                multi={true}
                                searchable={true}
                            />
                        </span>
                    </div>
                    <div id="providerfilter-city" className="providerfilterdiv">
                        <span className="providerfilterlabel">City</span>
                        <span className="providerfilterdropdown">
                            <VirtualizedSelect
                                options={cityDropDownList}
                                onChange={this.cityOnChange.bind(this)}
                                value={selectedCity}
                                clearable={true}
                                multi={true}
                                searchable={true}
                            />
                        </span>
                    </div>
                </div>
                <div id="providerslist">
                    {cards}
                </div>
            </div>
        );
    }
}

export default LocationFinder;
