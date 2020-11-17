import React, { useMemo } from "react";
import { SensorData } from "../../../../graphql/generated/graphql";
import { INITIAL_FILTER_STATE } from "./constants";
import { SensorDataKey } from "../../model";

export function useFilters(data?: SensorData[]) {
  const [filters, setFilters] = React.useState<
    { [K in SensorDataKey]?: string }
  >(INITIAL_FILTER_STATE);

  const filteredData = useMemo(() => {
    return (
      data.length > 0 &&
      data.filter(item => {
        return Object.keys(filters).every(key =>
          filters[key as SensorDataKey]
            ? Object.is(
                item[key as SensorDataKey],
                filters[key as SensorDataKey]
              )
            : true
        );
      })
    );
  }, [data, filters]);

  return { filteredData, filters, setFilters };
}
