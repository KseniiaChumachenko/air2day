import { Sensor } from "../../graphql/generated/graphql";
import { Moment } from "moment";
import { ActionTypes, OptionType } from "./constants";

export type DateType = string | Moment;

export type StateType =
  | {
      sensors: PlaceType[];
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

export type SensorWithType = Sensor & { type: OptionType };

export interface PlaceType extends SensorWithType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}
