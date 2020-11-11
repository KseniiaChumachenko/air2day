import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer
} from "react";
import { PlaceType } from "./model";
import moment, { Moment } from "moment";
import { useRouterParamsQuery } from "../../hooks/useRouterParamsQuery";
import {
  Action,
  ActionTypes,
  DateType,
  QUERY_PARAMS,
  StateType
} from "./constants";

function reducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case ActionTypes.UPDATE_ALL:
      return action.payload as StateType;
    case ActionTypes.UPDATE_LOCATIONS:
      return { ...state, locations: action.payload as PlaceType[] };
    case ActionTypes.UPDATE_FROM_DATE:
      return { ...state, selectedFromDate: action.payload as DateType };
    case ActionTypes.UPDATE_TO_DATE:
      return { ...state, selectedToDate: action.payload as DateType };
  }
}

const INITIAL_STATE: StateType = {
  locations: [],
  selectedFromDate: moment()
    .subtract(1, "month")
    .format(),
  selectedToDate: moment().format()
};

export const UserContext = createContext<{
  state: StateType;
  dispatch: Dispatch<Action>;
}>({
  state: INITIAL_STATE as StateType,
  dispatch: (action: Action) => {}
});

export function SearchDataProvider({ children }: { children: ReactNode }) {
  const paramsQuery = useRouterParamsQuery(QUERY_PARAMS);

  const [state, dispatch] = useReducer(reducer, {
    locations: paramsQuery?.locations || INITIAL_STATE.locations,
    selectedFromDate:
      paramsQuery?.dates.selectedFromDate || INITIAL_STATE.selectedFromDate,
    selectedToDate:
      paramsQuery?.dates.selectedToDate || INITIAL_STATE.selectedToDate
  });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
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
    dispatch({ type: ActionTypes.UPDATE_ALL, payload: INITIAL_STATE });

  return { searchData, clearSearchData };
}
