import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { ChartData } from "./index";
import { useTheme } from "@material-ui/core";

interface Props {
  data: ChartData;
}

/* TODO
 * fix theming
 * add tooltip for points
 * map hourAvg in sensorData
 * axes selector
 * */

export const Chart = ({ data }: Props) => {
  const theme = useTheme();
  return (
    <ResponsiveLine
      data={data}
      lineWidth={1}
      pointSize={2}
      colors={{ scheme: "set1" }}
      margin={{ top: 50, right: 160, bottom: 100, left: 60 }}
      theme={{
        axis: {
          domain: { line: { color: theme.palette.text.primary } },
          ticks: {
            line: { color: theme.palette.text.primary },
            text: { color: theme.palette.text.primary }
          },
          legend: {
            text: { color: theme.palette.text.primary }
          }
        }
      }}
      curve={"monotoneX"}
      xScale={{
        type: "time"
        //   format: "%Y-%m-%d",
        //   precision: "month"
      }}
      axisBottom={{
        legend: "Pollutant", //TODO : localization
        tickRotation: -45,
        legendOffset: 80,
        format: "%Y-%m-%d"
      }}
      legends={[
        {
          itemTextColor: theme.palette.text.primary,
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 140,
          translateY: 0,
          itemsSpacing: 2,
          itemDirection: "left-to-right",
          itemWidth: 80,
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
    />
  );
};
