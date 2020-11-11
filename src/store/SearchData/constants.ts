import { LocationParams } from "../../screens/Locations/model";
import { Moment } from "moment";
import { PlaceType } from "./model";

export const QUERY_PARAMS = [LocationParams.locations, LocationParams.dates];

export enum ActionTypes {
  UPDATE_ALL = "UPDATE_ALL",
  UPDATE_LOCATIONS = "UPDATE_LOCATIONS",
  UPDATE_FROM_DATE = "UPDATE_FROM_DATE",
  UPDATE_TO_DATE = "UPDATE_TO_DATE"
}
export type DateType = string | Moment;

export type StateType =
  | {
      locations: PlaceType[];
      selectedFromDate: DateType;
      selectedToDate: DateType;
    }
  | null
  | undefined;

export interface Action {
  type: ActionTypes;
  payload: StateType | PlaceType[] | DateType;
}
