import { Sensor } from "../../graphql/generated/graphql";

export enum OptionType {
  sensor = "Sensors",
  location = "Locations"
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
