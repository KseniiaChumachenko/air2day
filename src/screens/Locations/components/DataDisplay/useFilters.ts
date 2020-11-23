import React, { useMemo } from "react";
import { INITIAL_FILTER_STATE } from "./constants";
import { SensorDataKey, SensorsData } from "../../model";

export function useFilters(data?: SensorsData) {
  const [filters, setFilters] = React.useState<
    { [K in SensorDataKey]?: string }
  >(INITIAL_FILTER_STATE);

  const sensorIds = data && Object.keys(data);

  const filteredData = sensorIds
    ?.map((id, index) => ({
      [sensorIds[index]]: data[id].filter(item => {
        return Object.keys(filters).every(key =>
          filters[key as SensorDataKey]
            ? Object.is(
                item[key as SensorDataKey],
                filters[key as SensorDataKey]
              )
            : true
        );
      })
    }))
    .reduce((previousValue, currentValue) => ({
      ...previousValue,
      ...currentValue
    }));

  // const filteredData = {};
  //     useMemo(() => {
  //   return data.filter(item => {
  //     return Object.keys(filters).every(key =>
  //       filters[key as SensorDataKey]
  //         ? Object.is(item[key as SensorDataKey], filters[key as SensorDataKey])
  //         : true
  //     );
  //   });
  // }, [data, filters]);

  return { filteredData, filters, setFilters };
}
