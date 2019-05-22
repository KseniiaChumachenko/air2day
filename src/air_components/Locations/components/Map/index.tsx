import React from "react";

import GoogleMapReact from "google-map-react";
import { SensorsQuery } from "../../../../generated/graphql";

import { withStyles, WithStyles } from "@material-ui/core";

import { Marker } from "./Marker";
import styles from "./styles";

interface MapProps extends WithStyles<typeof styles> {
  data: SensorsQuery;
  center?: any;
  zoom?: any;
}

class Map extends React.PureComponent<MapProps> {
  render() {
    const {
      center = { lat: 50.09423833333334, lng: 14.44204888888889 },
      zoom = 13,
      classes,
      data
    } = this.props;

    const { sensors } = data;
    return (
      <div className={classes.container}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBhcFB0JFXy8hv4pyQqZh7isVbn3-Tfzxk" }} // TODO: replace with Key provided by CTU
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={({ map, maps }) => {
            console.log(map, maps);
            maps.Geocoder(
              {
                location: {
                  lat: 50.09423833333334,
                  lng: 14.44204888888889
                }
              },
              function(result: any, status: any) {
                if (status == "OK") {
                  console.log(result);
                } else {
                  console.log("error");
                }
              }
            );
          }}
          yesIWantToUseGoogleMapApiInternals
        >
          {sensors!.map((sensor, key) => (
            <Marker
              lat={sensor!.latitude!}
              lng={sensor!.longitude!}
              key={key}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default withStyles(styles)(Map);
