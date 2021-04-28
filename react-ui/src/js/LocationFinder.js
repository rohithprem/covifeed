import React from "react";
import '../css/LocationFinder.css';
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const STATE_FILTER = "STATE_FILTER"
const CITY_FILTER = "CITY_FILTER"
const PINCODE_FILTER = "PINCODE_FILTER"

const whatsappText = encodeURI(
    "Hello 👋,\nI found your service through covifeedindia.com.\nI'd love to place an order.\n🥐🍞🥖🧋🍴🍎🫐🥭🥝"
);

export class LocationFinder extends React.Component {

    constructor(props) {
        console.log("CONSTRUCTOR");
        super(props);
        this.state = {
            providers: {data:[]},
            cityDropDown: [],
            stateDropDown: [],
            pinCodeDropDown: [],
            selectedCity: [],
            selectedState: [],
            filterquery: {city:[], state: [], pincode: []},
            elementChange: null,
            paginationStart: 0,
            paginationSize: 25,
            providerCount: 0
        }
    }

    componentDidMount() {
        console.log("COMPONENT DID");
        this.fetchData();
    }

    fetchData(){
        console.log(JSON.stringify(this.state));
        this.fetchProviders();
        if(this.state.elementChange !== STATE_FILTER){
            this.fetchStateAggs();
        }
        if(this.state.elementChange !== CITY_FILTER){
            this.fetchCityAggs();
        }
        if(this.state.elementChange !== PINCODE_FILTER){
            this.fetchPINCodeAggs();
        }
        this.fetchCount();
    }

    fetchStateAggs(){
        fetch("/providers/filters/State"
            + "?states=" + JSON.stringify(this.state.filterquery.state)
            + "&cities=" + JSON.stringify(this.state.filterquery.city)
            + "&pincodes=" + JSON.stringify(this.state.filterquery.pincode))
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

    fetchCityAggs(){
        fetch("/providers/filters/City"
            + "?states=" + JSON.stringify(this.state.filterquery.state)
            + "&cities=" + JSON.stringify(this.state.filterquery.city)
            + "&pincodes=" + JSON.stringify(this.state.filterquery.pincode))
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
    }

    fetchPINCodeAggs(){
        fetch("/providers/filters/PINCode"
            + "?states=" + JSON.stringify(this.state.filterquery.state)
            + "&cities=" + JSON.stringify(this.state.filterquery.city)
            + "&pincodes=" + JSON.stringify(this.state.filterquery.pincode))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        pinCodeDropDown: this.prepareDropDownData(result.data)
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        pinCodeDropDown: []
                    });
                }
            )
    }

    fetchProviders(){
        fetch("/providers/"
            + "?start=0" + this.state.paginationStart + "&size=" + this.state.paginationSize
            + "&states=" + JSON.stringify(this.state.filterquery.state)
            + "&cities=" + JSON.stringify(this.state.filterquery.city)
            + "&pincodes=" + JSON.stringify(this.state.filterquery.pincode))
            .then(res => res.json())
            .then(
                (result) => {
                    let providers = this.state.providers;
                    console.log("BEFORE: " + providers.length);
                    result.data.forEach(function(value, index){
                        providers.data.push(value)
                    });
                    console.log("AFTER: " + providers.length);
                    this.setState({
                        providers: providers
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        providers: {data:[]}
                    });
                }
            )
    }

    fetchCount(){
        fetch("/providers/count"
            + "?states=" + JSON.stringify(this.state.filterquery.state)
            + "&cities=" + JSON.stringify(this.state.filterquery.city)
            + "&pincodes=" + JSON.stringify(this.state.filterquery.pincode))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        providerCount: result.data
                    });
                },
                (error) => {
                    console.err(error);
                    this.setState({
                        providers: {data:[]}
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

    resetProviders(){
        this.state.paginationStart = 0;
        this.state.providers = {data:[]}
    }

    cityOnChange(selectedValue){
        let citiesSelected = selectedValue.map(function(values, index){
            return values.label;
        });
        let filterquery = this.state.filterquery;
        if(!filterquery){
            filterquery = {city:[], state:[], pincode:[]}
        }
        filterquery.city = citiesSelected;
        this.state.selectedCity = selectedValue? selectedValue : [];
        this.state.filterquery = filterquery;
        this.state.elementChange = CITY_FILTER;
        this.resetProviders();
        this.fetchData();
        this.fetchCount();
    }

    stateOnChange(selectedValue){
        let statesSelected = selectedValue.map(function(values, index){
            return values.label;
        });
        let filterquery = this.state.filterquery;
        if(!filterquery){
            filterquery = {city:[], state:[], pincode:[]}
        }
        filterquery.state = statesSelected;
        this.state.selectedState = selectedValue? selectedValue : [];
        this.state.filterquery = filterquery;
        this.state.elementChange = STATE_FILTER;
        this.resetProviders();
        this.fetchData();
        this.fetchCount();
    }

    pinCodeOnChange(selectedValue){
        let pinCodesSelected = selectedValue.map(function(values, index){
            return values.label;
        });
        let filterquery = this.state.filterquery;
        if(!filterquery){
            filterquery = {city:[], state:[], pincode:[]}
        }
        filterquery.pincode = pinCodesSelected;
        this.state.selectedPINCode = selectedValue? selectedValue : [];
        this.state.filterquery = filterquery;
        this.state.elementChange = PINCODE_FILTER;
        this.resetProviders();
        this.fetchData();
        this.fetchCount();
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
                            <div className="provider-key">Contact: </div><div className="provider-value"><a href={"tel:"+provider.PrimaryContactNumberToPlaceOrder}>{provider.PrimaryContactNumberToPlaceOrder}</a></div>
                        </div>
                        <div className="providercarddetail card-contact">
                            <div className="provider-key">PIN Code: </div><div className="provider-value">{provider.PINCode}</div>
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
                                <a href={"https://api.whatsapp.com/send?phone=91"+ provider.PrimaryContactNumberToPlaceOrder + "&text=" + whatsappText + "&&app_absent=1"}  className="contacticons"><i className="fa fa-whatsapp" aria-hidden="true"/></a>
                            </span>
                    </div>
                </div>)
        });
        return cards;
    }

    loadMore(){
        let pagination = this.state.paginationStart;
        let increment = this.state.paginationSize;
        pagination += increment;
        this.state.paginationStart = pagination;
        this.fetchProviders();
    }

    render() {
        console.log("RENDER");
        let cards = [];
        let selectedCity = null
        let selectedState = null
        let selectedPINCode = null;
        let cityDropDownList = [];
        let stateDropDownList = [];
        let pinCodeDropDownList = [];
        if(this.state){
            stateDropDownList = this.state.stateDropDown;
            cityDropDownList = this.state.cityDropDown;
            pinCodeDropDownList = this.state.pinCodeDropDown;
            selectedCity = this.state.selectedCity;
            selectedState = this.state.selectedState;
            selectedPINCode = this.state.selectedPINCode;
            if(this.state.providers){
                cards = this.createCards(this.state.providers.data);
            }
        }
        let shouldLoadMore = this.state.providers.data.length == this.state.providerCount;
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
                    <div id="providerfilter-pincode" className="providerfilterdiv">
                        <span className="providerfilterlabel">PIN Code</span>
                        <span className="providerfilterdropdown">
                            <VirtualizedSelect
                                options={pinCodeDropDownList}
                                onChange={this.pinCodeOnChange.bind(this)}
                                value={selectedPINCode}
                                clearable={true}
                                multi={true}
                                searchable={true}
                            />
                        </span>
                    </div>
                    <div id="providerfilter-count">
                        <span id="providerfilterlabel-count" className="providerfilterlabel">You have found</span>
                        <span id="providerfilter-count">{this.state.providerCount} Meal Providers</span>
                    </div>
                </div>
                <div id="providerslist">
                    {cards}
                </div>
                {shouldLoadMore ? "" : (<div id="providerslist-pagination-holder">
                    <button className="providerslist-pagination-button" onClick={this.loadMore.bind(this)}>Load More</button>
                </div>)}
            </div>
        );
    }
}

export default LocationFinder;
