import React from "react";
import {
  SensorData,
  useAirPolutionPredictionQuery
} from "../../graphql/generated/graphql";
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography
} from "@material-ui/core";
import moment from "moment";
import { Trans } from "@lingui/macro";

const DATE_IN_MONTH = moment()
  .add(1, "months")
  .format();
const DATE_IN_YEAR = moment()
  .add(1, "years")
  .format();
const DATE_IN_TEN_YEARS = moment()
  .add(10, "years")
  .format();

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>
        <Trans>When</Trans>
      </TableCell>
      <TableCell>
        <Trans>Pollutant</Trans>
      </TableCell>
      <TableCell>
        <Trans>Per hour average</Trans>
      </TableCell>
      <TableCell>
        <Trans>Value [µg/m³]</Trans>
      </TableCell>
    </TableRow>
  </TableHead>
);

type ResponseType = Pick<
  SensorData,
  "from" | "hourAvg" | "id" | "pollutant" | "sensorIds" | "to" | "value"
>;

const PredictionBody = ({ from, pollutant, hourAvg, value }: ResponseType) => {
  return (
    <TableRow>
      <TableCell>{moment(from).fromNow()}</TableCell>
      <TableCell>{pollutant}</TableCell>
      <TableCell>{hourAvg}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    table: {
      marginTop: theme.spacing(1)
    }
  })
);

interface AirQualityPredictionCardProps {
  userPosition: Position;
}

export function AirQualityPredictionCard({
  userPosition
}: AirQualityPredictionCardProps) {
  const classes = useStyles({});

  const { latitude, longitude } = userPosition.coords;
  const variables = (time: string) => {
    return {
      variables: {
        latitude,
        longitude,
        time: time
      }
    };
  };

  const predictionInMonth = useAirPolutionPredictionQuery(
    variables(DATE_IN_MONTH)
  );

  const predictionInYear = useAirPolutionPredictionQuery(
    variables(DATE_IN_YEAR)
  );

  const predictionInTenYears = useAirPolutionPredictionQuery(
    variables(DATE_IN_TEN_YEARS)
  );

  const withWidget =
    predictionInMonth?.data ||
    predictionInYear?.data ||
    predictionInTenYears?.data;

  return (
    <Grid item md={6}>
      {withWidget && (
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Trans>Air pollution prediction for your location</Trans>
            </Typography>
            <Table size={"small"} className={classes.table}>
              <TableHeader />
              {predictionInMonth?.data && (
                <TableBody>
                  {predictionInMonth.data.interpolateData.map(item => (
                    <PredictionBody {...item} />
                  ))}
                  {predictionInYear.data.interpolateData.map(item => (
                    <PredictionBody {...item} />
                  ))}
                  {predictionInTenYears.data.interpolateData.map(item => (
                    <PredictionBody {...item} />
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
}
