import React from "react";

//import GoogleMapReact from "google-map-react";

interface LocationsProps {
    center: any;
    zoom: any;
}

class Locations extends React.PureComponent<LocationsProps> {
    render() {
        const {
            center = {lat: 40.744679, lng: -73.948542},
            zoom = 11
        } = this.props;
        return (
            <div>Some text example</div>
            //<GoogleMapReact defaultCenter={center} defaultZoom={zoom}/>
        );
    }
}

export default Locations;
