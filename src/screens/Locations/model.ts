import { SensorData } from "src/graphql/generated/graphql";

export interface SensorDataConsumer {
  data: SensorsData;
  loading?: boolean;
  rowsPerPage?: number;
}

export enum LocationParams {
  locations = "locations",
  dates = "dates"
}

export type SensorDataKey = keyof SensorData;

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
