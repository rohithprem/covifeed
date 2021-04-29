import React from "react";
import '../css/LocationFinder.css';
import VirtualizedSelect from 'react-virtualized-select'
import ProviderCard from "./ProviderCard";
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import {FormControlLabel, Switch} from '@material-ui/core'
import {green} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles';

const STATE_FILTER = "STATE_FILTER"
const CITY_FILTER = "CITY_FILTER"
const PINCODE_FILTER = "PINCODE_FILTER"

const PurpleSwitch = withStyles({
    switchBase: {
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

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
            selectedState: null,
            selectedNameFilter: "",
            filterquery: {city:[], state: [], pincode: []},
            elementChange: null,
            paginationStart: 0,
            paginationSize: 30,
            providerCount: 0,
            selectedPINCode: [],
            isVegOnly: false
        }
    }

    componentDidMount() {
        console.log("COMPONENT DID");
        this.fetchData();
    }

    fetchData(){
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

    fetchDataQueryParams(){
        return "states=" + JSON.stringify(this.state.filterquery.state)
            + "&cities=" + JSON.stringify(this.state.filterquery.city)
            + "&pincodes=" + JSON.stringify(this.state.filterquery.pincode)
            + "&namesearch=" + this.state.selectedNameFilter
            + "&isvegonly=" + this.state.isVegOnly;
    }

    fetchStateAggs(){
        fetch("/providers/filters/State?" + this.fetchDataQueryParams())
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
        fetch("/providers/filters/City?" + this.fetchDataQueryParams())
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
        fetch("/providers/filters/PINCode?" + this.fetchDataQueryParams())
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
            + "&" + this.fetchDataQueryParams())
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
        fetch("/providers/count?" + this.fetchDataQueryParams())
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
        let statesSelected = selectedValue ? [selectedValue.label] : [];
        let filterquery = this.state.filterquery;
        if(!filterquery){
            filterquery = {city:[], state:[], pincode:[]}
        }
        filterquery.state = statesSelected;
        this.state.selectedState = selectedValue? selectedValue : null;
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
                return {
                    value: index+1,
                    label: dbItem._id,
                    totaldocs: dbItem.totaldocs
                };
            });
        }
        return dropdownItems;
    }

    createCards(providers){
        return providers.map(function(provider, index){
            return (<ProviderCard index={index} provider={provider} />);
        });
    }

    loadMore(){
        let pagination = this.state.paginationStart;
        let increment = this.state.paginationSize;
        pagination += increment;
        this.state.paginationStart = pagination;
        this.fetchProviders();
    }

    onNameChange(event){
        console.log(event);
        if(event.key === 'Enter'){
            this.triggerNameChange(event.target.value);
        }
    }

    triggerNameChange(event){
        this.state.selectedNameFilter = event.target.value;
        this.resetProviders();
        this.fetchData();
    }

    handleMealOptionToggle(selectedValue){
        console.log(selectedValue);
        this.state.isVegOnly= !this.state.isVegOnly;
        this.resetProviders();
        this.fetchData();
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
        let countFetched = this.state.providers.data.length;
        let shouldLoadMore = countFetched === this.state.providerCount;
        return (
            <div id="locationfinder">
                <div id="providerfilters">
                    <div id="providerfilter-name" className="providerfilterdiv">
                        <span className="providerfilterlabel">Name</span>
                        <span className="providerfilterdropdown">
                            <input
                                onBlur={this.triggerNameChange.bind(this)}
                                id="name-filter"
                                className="filter-inputbox"
                                type="text"
                                placeholder="Enter Name"/>
                        </span>
                    </div>
                    <div id="providerfilter-state" className="providerfilterdiv">
                        <span className="providerfilterlabel">State</span>
                        <span className="providerfilterdropdown">
                            <VirtualizedSelect
                                options={stateDropDownList}
                                onChange={this.stateOnChange.bind(this)}
                                value={selectedState}
                                clearable={true}
                                multi={false}
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
                    <div id="providerfilter-vegnonveg" className="providerfilterdiv">
                        <FormControlLabel
                            control={
                                <PurpleSwitch
                                    checked={this.state.isVegOnly}
                                    onChange={this.handleMealOptionToggle.bind(this)}
                                    name="Veg Only"
                                    color="green"
                                />
                            }
                            label="Veg Only"
                        />
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