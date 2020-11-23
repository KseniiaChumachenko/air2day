import { LocationParams } from "../../screens/Locations/model";
import { StateType } from "./model";
import moment from "moment";

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

export const INITIAL_STATE: StateType = {
  sensors: [],
  locations: [],
  selectedFromDate: moment()
    .subtract(1, "month")
    .format(),
  selectedToDate: moment().format()
};
