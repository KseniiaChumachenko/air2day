import { SensorData } from "src/graphql/generated/graphql";

export enum LocationParams {
  locations = "locations",
  dates = "dates"
}

export interface SensorsData {
  [key: string]: SensorData[];
}

interface TimeProps {
  from: string;
  to: string;
}

type SensorPollutionProps = {
  [sensorId: string]: number;
} & TimeProps;

export type SensorPollutionData = Array<SensorPollutionProps>;

export type SensorPollutionDataOverHourAvg = {
  [hourAvg: number]: SensorPollutionData;
};

export type RemappedSensorsData = {
  [pollutant: string]: SensorPollutionDataOverHourAvg;
};

export interface UseRemappedDataResults {
  remappedData?: RemappedSensorsData;
  fromDates?: string[];
  toDates?: string[];
  hourAvgs?: number[];
  pollutants?: string[];
  sensorIds?: string[];
}

export interface DataCardInfoItemProps
  extends Pick<UseRemappedDataResults, "sensorIds" | "hourAvgs"> {
  data: SensorPollutionDataOverHourAvg;
  hourAvg: number;
  pollutant: string;
}
