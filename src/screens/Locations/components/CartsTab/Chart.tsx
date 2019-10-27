import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface Props {
  data: { from: any; pollutant?: string; value?: number }[];
}

export const Chart = ({ data }: Props) => {
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
          label={{
            value: "[µg/m³]",
            position: "center",
            angle: -90
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#FF4081"
          activeDot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
