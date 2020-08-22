import React from "react";
import { Trans } from "@lingui/macro";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";

import { CardView } from "./Card";
import useStyles from "./styles";
import { ScrollableContainer } from "../../components/ScrollableContainer";
import { useTabTitle } from "../../hooks/useTabTitle";
import { useLanguageSetup } from "../../hooks/useLanguageSetup";
import {
  useAirQualityIndexByLocationsQuery,
  useDashboardDataQuery
} from "../../graphql/generated/graphql";
import { usePositioning } from "../../hooks/usePositioning";
import { useNearestSensor } from "../../hooks/useNearestSensor";
import { AirQualityPredictionCard } from "./AirQualityPredictionCard";
import { AboutCurrentLocationCard } from "./AboutCurrentLocationCard";
import { DataFromNearestSensor } from "./DataFromNearestSensor";

export const Dashboard = () => {
  const { locale } = useLanguageSetup();
  const classes = useStyles({ locale });
  useTabTitle("Dashboard");
  const { data } = useDashboardDataQuery();

  const userPosition = usePositioning();
  const nearestSensor = useNearestSensor();

  const airQualityIndexes = useAirQualityIndexByLocationsQuery({
    variables: {
      latitude: userPosition?.coords?.latitude,
      longitude: userPosition?.coords?.longitude,
      sensorId: nearestSensor?.id
    }
  });

  return (
    <ScrollableContainer>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <Card>
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
                  We're compensating the lack of fine monitoring of air
                  pollution and informing people about current and forthcoming
                  state of air quality empowering them to live healthier lives
                  and create more sustainable business.
                </Trans>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <CardView
            media={
              data?.sensorsCount || (
                <CircularProgress size={40} color={"secondary"} />
              )
            }
            text={<Trans>sensors collecting data for you</Trans>}
          />
        </Grid>
        <Grid item md={6}>
          <CardView
            media={
              data?.providersCount || (
                <CircularProgress size={40} color={"secondary"} />
              )
            }
            text={
              <Trans>
                providers ensuring sensor condition to keep you updated
              </Trans>
            }
          />
        </Grid>
        <AboutCurrentLocationCard
          userPosition={userPosition}
          nearestSensor={nearestSensor}
        />
        <Grid item md={6}>
          <CardView
            media={
              airQualityIndexes?.data?.commonAirQualityIndex || (
                <CircularProgress size={40} color={"secondary"} />
              )
            }
            text={
              <Trans>
                is <i>Common air quality index</i> based on information, from
                the <b>nearest sensor</b>
              </Trans>
            }
          />
        </Grid>
        <Grid item md={6}>
          <CardView
            media={
              airQualityIndexes?.data?.interpolatedCommonAirQualityIndex || (
                <CircularProgress size={40} color={"secondary"} />
              )
            }
            text={
              <Trans>
                is <i>Common air quality index</i> calculated based on your
                <b> current location</b>
              </Trans>
            }
          />
        </Grid>
        {userPosition?.coords?.latitude && (
          <AirQualityPredictionCard userPosition={userPosition} />
        )}
        {nearestSensor && (
          <DataFromNearestSensor nearestSensor={nearestSensor} />
        )}
      </Grid>
    </ScrollableContainer>
  );
};
