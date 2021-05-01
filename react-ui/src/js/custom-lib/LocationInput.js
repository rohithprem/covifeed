import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import DisplayMap from "./DisplayMap";


export class LocationInput extends React.Component {

    constructor(props) {
        super(props);
        // this.classes = useStyles();
        this.state = {
            value: null,
            setValue: null,
            inputValue: '',
            setInputValue: '',
            options: [],
            setOptions: [],
            location: this.props.location
        };
        const loaded = React.createRef();
    }

    onChange(event, newValue){
        console.log("OnChange")
        console.log(newValue);
        fetch('https://lookup.search.hereapi.com/v1/lookup?apiKey=h3jerScqj_w2kMxm1pFvC7XK_3ZGrD2VKxCPDcRbNl8' +
            '&id=' + newValue.id)
            .then((res) => {return res.json()})
            .then((response) => {
                this.setState({location: response.position})
            });
    }

    onInputChange(event, newValue){
        if(newValue){
            fetch("https://autocomplete.search.hereapi.com/v1/autocomplete?in=countryCode%3AIND&apiKey=h3jerScqj_w2kMxm1pFvC7XK_3ZGrD2VKxCPDcRbNl8"
                + "&q=" + newValue)
                .then((response) => {
                    return response.json();
                }).then((res) => {

                this.setState(
                    {options: res.items}
                );
            });
        } else {
            this.setState({options: []});
        }
    }

    renderOption(option){
        return (
            <Grid container alignItems="center">
                <Grid item>
                    <LocationOnIcon />
                </Grid>
                <Grid item xs>
                    {option.title}
                </Grid>
            </Grid>
        );
    }

    onLongPress(event, coord){
        // this.props.onChange(coord);
        this.setState({location: coord});
    }

    onDrag(event, coord){
        // this.props.onChange(coord);
        this.setState({location: coord});
    }

    setLocationOnClick(){
        this.props.onChange(this.state.location);
    }

    render(){
        console.log("OPTIONS");
        console.log(this.state.options)
        return (
            <div>
                <Autocomplete
                    id="google-map-demo"
                    style={{ width: 300 }}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
                    options={this.state.options}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onInputChange={this.onInputChange.bind(this)}
                    renderInput={(params) => (
                        <TextField {...params} label="Add a location" variant="outlined" fullWidth />
                    )}
                    renderOption={this.renderOption.bind(this)}
                />
                <DisplayMap
                    location={this.state.location}
                    radius={this.props.radius}
                    onLongPress={this.onLongPress.bind(this)}
                    onMarkerDrag={this.onDrag.bind(this)}
                />
                <button onClick={this.setLocationOnClick.bind(this)}>Set Location</button>
            </div>
        );
    }
}

export default LocationInput;

