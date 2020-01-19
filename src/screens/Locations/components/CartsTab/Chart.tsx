import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { color, HUE } from "./colors";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import {
  amber,
  blue,
  brown,
  deepPurple,
  green,
  indigo,
  lime,
  pink,
  red,
  teal
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    legendContainer: {
      display: "flex",
      justifyContent: "center"
    },
    itemContainer: {
      margin: theme.spacing(2)
    },
    0: {
      color: pink[HUE]
    },
    1: {
      color: blue[HUE]
    },
    2: {
      color: green[HUE]
    },
    3: {
      color: deepPurple[HUE]
    },
    4: {
      color: lime[HUE]
    },
    5: {
      color: amber[HUE]
    },
    6: {
      color: teal[HUE]
    },
    7: {
      color: brown[HUE]
    },
    8: {
      color: red[HUE]
    },
    default: {
      color: indigo[HUE]
    }
  })
);

interface Props {
  data: any;
}

// TODO legend colors

export const Chart = ({ data }: Props) => {
  const classes = useStyles({});

  const keysToMap = Object.keys(data[0]).filter(
    item => !(item === "to" || item === "from")
  );

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className={classes.legendContainer}>
        {payload.map((item: any, key: number) => (
          <div className={classes.itemContainer} key={key}>
            <Typography>
              <li className={key < 10 ? classes[key] : classes.default}>
                {keysToMap[key]}
              </li>
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  const renderLabel = () => {
    return <Typography color={"textPrimary"}>[µg/m³]</Typography>;
  };

  return (
    <ResponsiveContainer>
      <LineChart
        width={400}
        height={250}
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="from" />
        <YAxis
          label={{ angle: -90, position: "center", content: renderLabel }}
        />

        <Tooltip />
        <Legend content={renderLegend} />
        {keysToMap.map((key, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={item => item[key]}
            stroke={color(index)}
            activeDot={{ r: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
