import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from "react";
import { Action, PlaceType, StateType, DateType } from "./model";
import moment from "moment";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { useRouterParamsQuery } from "../../hooks/useRouterParamsQuery";
import { SensorsQuery, useSensorsQuery } from "../../graphql/generated/graphql";
import { getSensorAddress } from "../../components/GoogleApi/useSensorGeocoding";
import {
  QUERY_PARAMS,
  OptionType,
  ActionTypes,
  INITIAL_STATE
} from "./constants";

const remappedSensorOptions: (data: SensorsQuery) => PlaceType[] = data =>
  data?.sensors.map(option => ({
    description: getSensorAddress(option),
    type: OptionType.sensor,
    structured_formatting: {
      main_text: getSensorAddress(option),
      secondary_text: option.code,
      main_text_matched_substrings: [{ offset: 0, length: 0 }]
    },
    ...option
  }));

function reducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case ActionTypes.UPDATE_ALL:
      return action.payload as StateType;
    case ActionTypes.UPDATE_SENSORS:
      return { ...state, sensors: action.payload as PlaceType[] };
    case ActionTypes.UPDATE_LOCATIONS:
      return { ...state, locations: action.payload as PlaceType[] };
    case ActionTypes.UPDATE_FROM_DATE:
      return { ...state, selectedFromDate: action.payload as DateType };
    case ActionTypes.UPDATE_TO_DATE:
      return { ...state, selectedToDate: action.payload as DateType };
  }
}

export const UserContext = createContext<{
  state: StateType;
  dispatch: Dispatch<Action>;
}>({
  state: INITIAL_STATE as StateType,
  dispatch: (action: Action) => {}
});

export function SearchDataProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const paramsQuery = useRouterParamsQuery(QUERY_PARAMS);
  const { data, error } = useSensorsQuery();

  const [state, dispatch] = useReducer(reducer, {
    sensors: remappedSensorOptions(data) || INITIAL_STATE.sensors,
    locations: paramsQuery?.locations || INITIAL_STATE.locations,
    selectedFromDate:
      paramsQuery?.dates.selectedFromDate || INITIAL_STATE.selectedFromDate,
    selectedToDate:
      paramsQuery?.dates.selectedToDate || INITIAL_STATE.selectedToDate
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: ActionTypes.UPDATE_SENSORS,
        payload: remappedSensorOptions(data)
      });
    }
  }, [data]);

  if (error) {
    setOpen(true);
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          <Trans>Something went wrong! Sensors are not available.</Trans>
        </Alert>
      </Snackbar>
    </UserContext.Provider>
  );
}

export function useSearchData() {
  const { state, dispatch } = useContext(UserContext);
  const searchData = state;
  return { searchData, dispatch };
}

export function useUpdateSearchData() {
  const { searchData, dispatch } = useSearchData();

  const setSearchData = (newSearch: StateType) =>
    dispatch({ type: ActionTypes.UPDATE_ALL, payload: newSearch });

  const setLocations = (locations: PlaceType[]) =>
    dispatch({ type: ActionTypes.UPDATE_LOCATIONS, payload: locations });

  const setFromDate = (selectedFromDate: DateType) =>
    dispatch({ type: ActionTypes.UPDATE_FROM_DATE, payload: selectedFromDate });

  const setToDate = (selectedToDate: DateType) =>
    dispatch({ type: ActionTypes.UPDATE_TO_DATE, payload: selectedToDate });

  return { searchData, setSearchData, setLocations, setFromDate, setToDate };
}

export function useClearSearchData() {
  const { searchData, dispatch } = useSearchData();
  const clearSearchData = () =>
    dispatch({ type: ActionTypes.UPDATE_LOCATIONS, payload: [] });

  return { searchData, clearSearchData };
}
