import { useEffect, useMemo, useState } from "react";
import { ApolloError } from "@apollo/client";
import moment from "moment";

import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { useDataTableQuery } from "../../../../graphql/generated/graphql";

/*
 * Data fetch logic
 * Due to imperfection of API and Apollo Client requests had to be separated and mapped */
export function useGetSensorsData() {
  // retrieves selected sensors from search field
  const { searchData } = useUpdateSearchData();
  const { locations, selectedFromDate, selectedToDate } = useMemo(
    () => searchData,
    [searchData]
  );

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<ApolloError | undefined>();

  // fetch of data from first filter
  const { loading, fetchMore } = useDataTableQuery({
    variables: {
      sensorId: locations[0].id,
      from: moment(selectedFromDate, "YYYY-MM-DDTHH:mm:ss"),
      to: moment(selectedToDate, "YYYY-MM-DDTHH:mm:ss")
    },
    onCompleted: data1 =>
      setData(prevState => prevState.concat(data1.sensorData)),
    onError: error1 => setError(error1)
  });

  // fetch of the data from the rest of the filters
  useEffect(() => {
    if (locations.length > 1) {
      locations.map((l, i) => {
        if (i > 0) {
          fetchMore({
            variables: {
              sensorId: l.id,
              from: moment(selectedFromDate, "YYYY-MM-DDTHH:mm:ss"),
              to: moment(selectedToDate, "YYYY-MM-DDTHH:mm:ss")
            }
          }).then(({ data, error }) => {
            if (error) {
              setError(error);
            }
            if (data) {
              setData(prevState => prevState.concat(data.sensorData));
            }
          });
        }
      });
    }
  }, [locations, selectedToDate, selectedFromDate]);

  return {
    data: data,
    loading,
    error
  };
}