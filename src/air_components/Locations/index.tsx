import React, { useEffect } from "react";

import {
  Container,
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core";

import { SelectMenu } from "./components/TableTab/components/Selectors";
import { SensorsComponent } from "../../generated/graphql";
import { Loading, ErrorBanner } from "../components";
import Map from "./components/Map";
import GetAddress from "./utils/geocoding";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 0,
      margin: 0,
      display: "flex",
      flex: 1
    },
    root: {
      margin: 0,
      width: "100%",
      height: "95vh",
      display: "flex",

      [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
      }
    },
    dataColumn: {
      display: "flex",
      flexDirection: "column",
      overflow: "scroll",
      flexGrow: 1,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  });

export const Locations = withStyles(styles)(
  ({ classes }: WithStyles<typeof styles>) => {

    // TODO: uncomment when direct communication to google maps Api will be ready
    /*const [addresses, setAddress] = React.useState([{ id: "", address: "" }]);
    const [coords, setCoords] = React.useState([
      {
        id: "5cb708b3cdcf75058dac9d56",
        lat: 50.072387777777784,
        lng: 14.430672777777778
      }
    ]);


    useEffect(() => {
      const array = GetAddress.fromLatLng(coords);
      array.then(r => {
        setAddress(r);
      });
    });*/

    return (
      <Container className={classes.container} maxWidth={false}>
        <SensorsComponent>
          {({ data, loading, error }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <ErrorBanner />;
            }
            if (data) {

              return (
                <div className={classes.root}>
                  <Map data={data} />

                  <div className={classes.dataColumn}>
                    <SelectMenu />
                  </div>
                </div>
              );
            }
          }}
        </SensorsComponent>
      </Container>
    );
  }
);







