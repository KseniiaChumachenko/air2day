import React, { ReactNode } from "react";
import moment from "moment";
import { ResponsiveLine } from "@nivo/line";
import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import {
  DataCardInfoItemProps,
  SensorPollutionDataOverHourAvg,
  UseRemappedDataResults
} from "../../model";
import { analogousColors } from "../../../../store/ThemeProvider/theme";
import { EU_POLLUTION_LIMITS } from "../../../../constants/EU_POLLUTION_LIMITS";
import { Trans } from "@lingui/macro";

export type ChartData = Array<{
  id: string | number;
  data: Array<{ x: number | string | Date; y: number | string | Date }>;
}>;

interface Props extends DataCardInfoItemProps {
  fromDates: string[];
  pollutant: string;
  hourAvg: number;
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
      height: 600
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
  sensorIds,
  fromDates,
  pollutant,
  hourAvg
}: Props) => {
  const theme = useTheme();
  const classes = useStyles({});

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const extractData = data && data[hourAvg];

  const chartData = extractData && chartAxes(extractData, sensorIds, fromDates);

  const limitValue = (EU_POLLUTION_LIMITS as any)[pollutant as any] || 10000000;

  const aboveMaxValue = (d: any) =>
    Math.max(...d.data.map((i: any) => i.data.y)) > limitValue;

  return (
    <div className={classes.root}>
      <ResponsiveLine
        data={chartData}
        lineWidth={2}
        pointSize={2}
        colors={analogousColors}
        margin={{ top: 15, right: 26, bottom: isMobile ? 220 : 140, left: 46 }}
        theme={createTheme(theme)}
        curve={"monotoneX"}
        xScale={{
          type: "time"
        }}
        axisBottom={{
          legend: <Trans>Timestamp</Trans>,
          tickRotation: -45,
          legendOffset: 90,
          format: "%d/%m/%Y"
        }}
        axisLeft={{
          legend: <Trans>Value [µg/m³]</Trans>,
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
        //Gradients
        enableArea={true}
        defs={[
          {
            id: "gradientC",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "red" },
              { offset: 15, color: "transparent" },
              { offset: 100, color: "transparent" }
            ]
          },
          {
            id: "gradientT",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "transparent" },
              { offset: 100, color: "transparent" }
            ]
          }
        ]}
        fill={[
          {
            match: d => aboveMaxValue(d),
            id: "gradientC"
          },
          {
            match: d => !aboveMaxValue(d),
            id: "gradientT"
          }
        ]}
      />
    </div>
  );
};
