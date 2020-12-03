import { SensorsData, UseRemappedDataResults } from "../../model";
import { SensorData } from "../../../../graphql/generated/graphql";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { useMemo } from "react";

function extractUniqueSensorValues(
  data: SensorsData,
  keyToExtract: keyof SensorData
) {
  return [
    ...new Set(
      Object.keys(data)
        .map(s => data[s].map(d => d[keyToExtract]))
        .flat()
    )
  ];
}

export function useRemappedData(data: SensorsData): UseRemappedDataResults {
  const { searchData } = useUpdateSearchData();
  const { locations } = useMemo(() => searchData, [searchData]);
  const sensorIds = locations?.map(l => l.code);

  const fromDates = data && extractUniqueSensorValues(data, "from");
  const toDates = data && extractUniqueSensorValues(data, "to");
  const hourAvgs = data && extractUniqueSensorValues(data, "hourAvg");
  const pollutants = data && extractUniqueSensorValues(data, "pollutant");

  const remappedData = pollutants?.reduce(
    (accPollutants, curPollutants) => ({
      ...accPollutants,
      [curPollutants]: {
        ...Object.fromEntries(
          hourAvgs.map(hourAvg => [
            hourAvg,
            fromDates.map((from, index) => ({
              from,
              to: toDates[index],
              ...Object.fromEntries(
                sensorIds.map(id => {
                  const value = data[id]?.find(
                    item =>
                      item.pollutant === curPollutants &&
                      item.hourAvg === hourAvg &&
                      item.from === from
                  )?.value;
                  return [id, value];
                })
              )
            }))
          ])
        )
      }
    }),
    {}
  );

  return { remappedData, fromDates, toDates, hourAvgs, pollutants, sensorIds };
}
