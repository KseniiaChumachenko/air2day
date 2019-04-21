import React from "react";

import GoogleMapReact from "google-map-react";

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
            <div style={{height: "50vh", width: "100%"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyBhcFB0JFXy8hv4pyQqZh7isVbn3-Tfzxk"}}         // TODO: replace with Key provided by CTU
                    defaultCenter={center}
                    defaultZoom={zoom}
                />
            </div>
        );
    }
}

export default Locations;
