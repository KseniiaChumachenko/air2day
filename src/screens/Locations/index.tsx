import React, { useEffect } from "react";

import { Container, createStyles, Theme, makeStyles } from "@material-ui/core";

import { SelectMenu } from "./components/TableTab/components/Selectors";

import Map from "./components/Map";
import GetAddress from "./utils/geocoding";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "src/components/LoadingState";
import { Error } from "src/components/Error";

const useStyles = makeStyles((theme: Theme) =>
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
  })
);

const GET_SENSORS = gql`
  query Sensors {
    sensors {
      code
      altitude
      latitude
      longitude
      altitude
      web
      id
    }
  }
`;

export const Locations = () => {
  const classes = useStyles({});

  const { data, loading, error } = useQuery(GET_SENSORS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

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
      <div className={classes.root}>
        <Map data={data} />
        <div className={classes.dataColumn}>
          <SelectMenu />
        </div>
      </div>
    </Container>
  );
};
