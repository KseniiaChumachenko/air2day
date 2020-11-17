import { LocationParams } from "../../screens/Locations/model";

export enum OptionType {
  sensor = "Sensors",
  location = "Locations"
}

export enum ActionTypes {
  UPDATE_ALL = "UPDATE_ALL",
  UPDATE_SENSORS = "UPDATE_SENSORS",
  UPDATE_LOCATIONS = "UPDATE_LOCATIONS",
  UPDATE_FROM_DATE = "UPDATE_FROM_DATE",
  UPDATE_TO_DATE = "UPDATE_TO_DATE"
}

export const QUERY_PARAMS = [LocationParams.locations, LocationParams.dates];
