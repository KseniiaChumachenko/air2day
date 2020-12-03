import { History } from "history";
import { LocationParams } from "../screens/Locations/model";
import { DateType, PlaceType } from "../store/SearchDataProvider/model";

export function redirectQueryComposer(
  history: History<unknown>,
  locations: PlaceType[],
  selectedFromDate: DateType,
  selectedToDate: DateType
) {
  return history.push(
    `/locations?${LocationParams.locations}="${JSON.stringify(locations)}"&${
      LocationParams.dates
    }="${JSON.stringify({
      selectedFromDate,
      selectedToDate
    })}"`
  );
}
