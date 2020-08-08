import React, { ReactNode } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ChartData } from "./index";
import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";

interface Props {
  title: ReactNode;
  axesLeftTitle: ReactNode;
  axesBottomTitle: ReactNode;
  data: ChartData;
}

/* TODO
 * axes selector
 * */

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
      width: "100%",
      height: 600,
      padding: theme.spacing(2)
    },
    title: {
      textAlign: "center"
    }
  })
);

export const Chart = ({
  data,
  title,
  axesBottomTitle,
  axesLeftTitle
}: Props) => {
  const theme = useTheme();
  const classes = useStyles({});

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper className={classes.root}>
      <Typography
        variant={"h5"}
        color={"textPrimary"}
        className={classes.title}
      >
        {title}
      </Typography>
      <ResponsiveLine
        data={data}
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
