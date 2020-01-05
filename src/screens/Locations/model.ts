import { SensorData } from "src/graphql/generated/graphql";

export interface SensorDataConsumer {
  sensorData: SensorData[];
  loading?: boolean;
}