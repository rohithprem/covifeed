// src/DisplayMapClass.js
import * as React from 'react';


const H = window.H;
export class DisplayMap extends React.Component {
    mapRef = React.createRef();

    svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">M</text></svg>';

    state = {
        // The map instance to use during cleanup
        map: null,
        isLoaded: false,
        markers: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const platform = new H.service.Platform({
            apikey: "h3jerScqj_w2kMxm1pFvC7XK_3ZGrD2VKxCPDcRbNl8"
        });

        const defaultLayers = platform.createDefaultLayers();
        console.log(this.props);
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: this.props.location.lat, lng: this.props.location.lng },
                zoom: 10,
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        let icon = new H.map.Icon(this.svgMarkup);
        // let coords = {lat: 52.53075, lng: 13.3851};
        let marker = new H.map.Marker(this.props.location, {icon: icon});
        marker.draggable = true;
        map.addObject(marker);
        let markers = [marker];
        map.setCenter(this.props.location);

        var circle = new H.map.Circle(this.props.location, this.props.radius);

        // Add the circle to the map:
        map.addObject(circle);
        markers.push(circle);
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        const mapEvents = new H.mapevents.MapEvents(map)
        const behavior = new H.mapevents.Behavior(mapEvents);

        map.addEventListener('dragstart', (ev) => {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                let targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
            }
        }, false);


        // re-enable the default draggability of the underlying map
        // when dragging has completed
        map.addEventListener('dragend', (ev) => {
            let target = ev.target;
            if (target instanceof H.map.Marker) {
                behavior.enable();
                let coord = map.screenToGeo(ev.currentPointer.viewportX,
                    ev.currentPointer.viewportY);
                this.props.onMarkerDrag(ev, coord);
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        map.addEventListener('drag', (ev) => {
            let target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false);

        map.addEventListener('longpress', (evt) => {
            let coord = map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            this.props.onLongPress(evt, coord);
        });

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        this.setState({ map: map, isLoaded: true, markers: markers });
    }

    componentWillUnmount() {
        // Cleanup after the map to avoid memory leaks when this component exits the page
        this.state.map.dispose();
    }

    render() {
        if(this.state.isLoaded){
            this.state.map.setCenter(this.props.location);
            this.state.map.removeObjects(this.state.markers);
            let icon = new H.map.Icon(this.svgMarkup);
            let marker = new H.map.Marker(this.props.location, {icon: icon});
            marker.draggable = true;
            this.state.map.addObject(marker);
            var circle = new H.map.Circle(this.props.location, this.props.radius);
            this.state.map.addObject(circle);
            this.state.markers = [marker, circle];
        }
        return (
            // Set a height on the map so it will display
            <div ref={this.mapRef} style={{ height: "500px" }} />
        );
    }
}

export default DisplayMap;