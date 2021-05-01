import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';


/*const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));*/

export class LocationAutocomplete extends React.Component {

    constructor(props) {
        super(props);
        // this.classes = useStyles();
        this.state = {
            value: null,
            setValue: null,
            inputValue: '',
            setInputValue: '',
            options: [],
            setOptions: []
        };
        const loaded = React.createRef();
    }

    onChange(event, newValue){
        console.log("OnChange")
        console.log(event);
        console.log(newValue);
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
        }
    }

    renderOption(option){
        console.log(option);
        // const matches = option.structured_formatting.main_text_matched_substrings;
        /*const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
        );
*/
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

    render(){
        console.log("OPTIONS");
        console.log(this.state.options)
        return (
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
        );
    }
}

export default LocationAutocomplete;

/*function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}*/

/*const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export default function GoogleMaps() {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            style={{ width: 300 }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Add a location" variant="outlined" fullWidth />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
*/


