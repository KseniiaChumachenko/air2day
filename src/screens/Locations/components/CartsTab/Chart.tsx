import React, { ReactNode } from "react";
import moment from "moment";
import { ResponsiveLine } from "@nivo/line";
import { ChartData } from "./index";
import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { Header } from "../Header";
import {
  SensorPollutionDataOverHourAvg,
  UseRemappedDataResults
} from "../../model";

interface Props extends UseRemappedDataResults {
  title: ReactNode;
  axesLeftTitle: ReactNode;
  axesBottomTitle: ReactNode;
  data: SensorPollutionDataOverHourAvg;
}

function createTheme(theme: Theme) {
  /* theming props are not obvious: https://github.com/plouc/nivo/blob/master/packages/core/src/theming/defaultTheme.js*/
  return {
    axis: {
      domain: { line: { color: theme.palette.text.primary } },
      ticks: {
        line: { stroke: theme.palette.text.primary },
        text: { fill: theme.palette.text.primary }
      },
      legend: {
        text: { fill: theme.palette.text.primary, fontSize: "16px" }
      }
    },
    labels: {
      text: { fill: theme.palette.text.primary }
    },
    legends: {
      text: { fill: theme.palette.text.primary, fontSize: "16px" }
    },
    markers: {
      textColor: theme.palette.text.primary
    },
    tooltip: {
      container: {
        fontFamily: theme.typography.fontFamily,
        background: theme.palette.background.paper,
        boxShadow:
          theme.palette.type === "dark"
            ? "0 1px 2px white"
            : "0 1px 2px rgba(0, 0, 0, 0.25)"
      }
    }
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 600,
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    title: {
      padding: theme.spacing(2)
    }
  })
);

// TODO: memoize calculations
function chartAxes(
  data: any,
  sensorIds: string[],
  fromDates: string[]
): ChartData {
  const avgValue = (id: string) => {
    const values = data?.map((i: any) => i[id] || 0);
    const arrayLength = values?.length;
    return values.reduce((acc: number, cur: number) => acc + cur) / arrayLength;
  };

  return sensorIds.map(id => ({
    id,
    data: fromDates.map((x, index) => ({
      x: moment(x).toDate(),
      y: data[index][id] || avgValue(id)
    }))
  }));
}

export const Chart = ({
  data,
  hourAvgs,
  sensorIds,
  fromDates,
  title,
  axesBottomTitle,
  axesLeftTitle
}: Props) => {
  const theme = useTheme();
  const classes = useStyles({});
  const [hourAvg, setHourAvg] = React.useState(hourAvgs[0]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const extractData = data && data[hourAvg];

  const chartData = extractData && chartAxes(extractData, sensorIds, fromDates);

  return (
    <Paper className={classes.root}>
      <Header
        title={title}
        setHourAvg={setHourAvg}
        hourAvg={hourAvg}
        hourAvgs={hourAvgs}
      />
      <ResponsiveLine
        data={chartData}
        lineWidth={1}
        pointSize={2}
        colors={
          theme.palette.type === "light"
            ? { scheme: "set1" }
            : { scheme: "nivo" }
        }
        margin={{ top: 15, right: 26, bottom: isMobile ? 220 : 140, left: 46 }}
        theme={createTheme(theme)}
        curve={"monotoneX"}
        xScale={{
          type: "time"
        }}
        axisBottom={{
          legend: axesBottomTitle,
          tickRotation: -45,
          legendOffset: 90,
          format: "%d/%m/%Y"
        }}
        axisLeft={{
          legend: axesLeftTitle,
          legendOffset: -40
        }}
        legends={[
          {
            itemTextColor: theme.palette.text.primary,
            anchor: "bottom",
            direction: isMobile ? "column" : "row",
            justify: false,
            translateX: 0,
            translateY: isMobile ? 180 : 80,
            itemsSpacing: 2,
            itemDirection: "left-to-right",
            itemWidth: 130,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        enableSlices={"x"}
        useMesh={true}
      />
    </Paper>
  );
};
