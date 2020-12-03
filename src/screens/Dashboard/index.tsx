import React from "react";
import { Trans } from "@lingui/macro";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Hidden,
  Snackbar,
  Typography
} from "@material-ui/core";

import { ScrollableContainer } from "../../components/ScrollableContainer";
import { useTabTitle } from "../../hooks/useTabTitle";
import {
  AirQualityIndexByLocationsQuery,
  DashboardDataQuery,
  Sensor,
  useAirQualityIndexByLocationsQuery,
  useDashboardDataQuery
} from "../../graphql/generated/graphql";
import { usePositioning } from "../../hooks/usePositioning";
import { useNearestSensor } from "../../hooks/useNearestSensor";
import { AirQualityPredictionCard } from "./AirQualityPredictionCard";
import { LocationItem } from "./LocationItem";
import { useAddressFromCoordinates } from "../../components/GoogleApi/useAddressFromCoordinates";
import { Position } from "../../types/model";
import { useSensorGeocoding } from "../../components/GoogleApi/useSensorGeocoding";
import { DefaultDashboardCard } from "./DefaultDashboardCard";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { useUpdateSearchData } from "../../store/SearchDataProvider";
import { redirectQueryComposer } from "../../utils/redirectQueryComposer";
import { Alert } from "@material-ui/lab";
import { MainIllustration } from "./MainIllustration";

export const Dashboard = () => {
  const classes = useStyles();

  useTabTitle("Dashboard");

  const { data, error } = useDashboardDataQuery();

  const userPosition = usePositioning();
  const nearestSensor = useNearestSensor();

  const airQualityIndexes = useAirQualityIndexByLocationsQuery({
    variables: {
      sensorId: nearestSensor?.id
    }
  });

  return (
    <div className={classes.gridWrapper}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Card
            variant={"outlined"}
            square={true}
            elevation={0}
            className={classes.introCardContainer}
          >
            <CardContent>
              <Typography variant={"h4"} className={classes.title}>
                <Trans>Find & understand</Trans>
              </Typography>
              <Typography variant={"h5"} className={classes.subtitle}>
                <Trans>what you’re breathing</Trans>
              </Typography>
              <Typography
                variant={"body1"}
                className={classes.intro}
                color={"textSecondary"}
              >
                <Trans>
                  Combatting the emission of pollutants through effective
                  reduction measures in order to avoid, prevent, or reduce at a
                  local, national, and international levels is crucial to
                  protect human health and the environment. However, combatting
                  emissions of pollutants is no small feat and the task itself
                  comes with a set of challenges - such as the current lack of
                  fine monitoring, as well as deficiency in the available
                  information on the risks pollutants pose.
                  <br />
                  <br />
                  Therefore, a comprehensive overview of the available data on
                  the ambient air quality is a crucial tool for citizens to
                  establish a better understanding of the state of the air they
                  are breathing and the ways in which pollution affects their
                  health.
                  <br />
                  <br />
                  Herein, this comprehensive overview can contribute to
                  combatting the emissions of pollutants on all levels of
                  society by give the ability for citizens become more informed
                  consumers who encourage sustainable business, and more
                  informed voters who ask more of their representatives.
                </Trans>
              </Typography>
            </CardContent>
            <Hidden mdDown={true}>
              <MainIllustration className={classes.mainIllustration} />
            </Hidden>
          </Card>
        </Grid>
        {data && (
          <>
            <SensorsCount data={data} />
            <ProvidersCount data={data} />
            <AboutCurrentLocation userPosition={userPosition} />
            <AboutNearestSensor nearestSensor={nearestSensor} />

            <AirQualityIndex data={airQualityIndexes?.data} />
            {/*<Grid item md={6}>*/}
            {/*  <CardView*/}
            {/*    media={*/}
            {/*      airQualityIndexes?.data?.interpolatedCommonAirQualityIndex || (*/}
            {/*        <CircularProgress size={40} color={"secondary"} />*/}
            {/*      )*/}
            {/*    }*/}
            {/*    text={*/}
            {/*      <Trans>*/}
            {/*        is <i>Common air quality index</i> calculated based on your*/}
            {/*        <b> current location</b>*/}
            {/*      </Trans>*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*{userPosition?.coords?.latitude && (*/}
            {/*  <AirQualityPredictionCard userPosition={userPosition} />*/}
            {/*)}*/}
          </>
        )}
        <Snackbar open={!!error}>
          <Alert severity="error">
            <Trans>Something went wrong! Data are not available.</Trans>
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
};

const SensorsCount = ({ data }: { data: DashboardDataQuery }) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/locations");
  };

  return (
    <DefaultDashboardCard
      message={
        <Typography>
          <Trans>sensors collecting data for you</Trans>
        </Typography>
      }
      data={
        data?.sensorsCount || <CircularProgress size={40} color={"secondary"} />
      }
      action={
        <Button variant={"text"} onClick={handleRedirect}>
          View locations
        </Button>
      }
    />
  );
};

const ProvidersCount = ({ data }: { data: DashboardDataQuery }) => (
  <DefaultDashboardCard
    message={
      <Typography>
        <Trans>providers ensuring sensor condition to keep you updated</Trans>
      </Typography>
    }
    data={
      data?.providersCount || <CircularProgress size={40} color={"secondary"} />
    }
  />
);

const AboutCurrentLocation = ({ userPosition }: { userPosition: Position }) => {
  const userAddress = useAddressFromCoordinates(userPosition?.coords);
  return (
    <DefaultDashboardCard
      message={
        <LocationItem
          title={<Trans>About your current location:</Trans>}
          latitude={userPosition?.coords?.latitude}
          longitude={userPosition?.coords?.longitude}
          address={userAddress}
        />
      }
    />
  );
};

const AboutNearestSensor = ({ nearestSensor }: { nearestSensor: Sensor }) => {
  const history = useHistory();
  const {
    searchData: { selectedToDate, selectedFromDate, sensors },
    setLocations
  } = useUpdateSearchData();
  const sensorAddress = useSensorGeocoding(nearestSensor);

  const findSensorAsPlaceType =
    sensors && sensors.find(s => s?.id === nearestSensor?.id);

  const handleClick = () => {
    setLocations([findSensorAsPlaceType]);
    redirectQueryComposer(
      history,
      [findSensorAsPlaceType],
      selectedFromDate,
      selectedToDate
    );
  };
  return (
    <DefaultDashboardCard
      message={
        <LocationItem
          title={<Trans>About nearest sensor:</Trans>}
          latitude={nearestSensor?.latitude}
          longitude={nearestSensor?.longitude}
          address={sensorAddress}
        />
      }
      action={
        <Button variant={"text"} onClick={handleClick}>
          View latest data
        </Button>
      }
    />
  );
};

const AirQualityIndex = ({
  data
}: {
  data: AirQualityIndexByLocationsQuery;
}) => (
  <DefaultDashboardCard
    message={
      <Typography>
        <Trans>
          is <i>Common Air Quality Index</i> based on information, from the
          <b>&nbsp;nearest sensor</b>
        </Trans>
      </Typography>
    }
    data={
      data?.commonAirQualityIndex || (
        <CircularProgress size={40} color={"secondary"} />
      )
    }
  />
);
