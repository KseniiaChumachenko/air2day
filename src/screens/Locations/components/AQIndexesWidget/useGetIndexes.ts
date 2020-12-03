import { useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import {
  CommonAirQualityIndexQuery,
  useCommonAirQualityIndexQuery
} from "../../../../graphql/generated/graphql";

export function useGetIndexes() {
  const [data, setData] = useState<{ [key: string]: number } | undefined>();
  const [error, setError] = useState<ApolloError | undefined>();
  const [loading, setLoading] = useState(false);
  const {
    searchData: { locations }
  } = useUpdateSearchData();

  const { fetchMore } = useCommonAirQualityIndexQuery({
    variables: { sensorId: locations[0]?.id },
    onCompleted: ({ commonAirQualityIndex }) =>
      setData(prevState => ({
        ...prevState,
        [locations[0].code]: commonAirQualityIndex
      })),
    onError: error1 => setError(error1)
  });

  useEffect(() => {
    if (locations.length > 1) {
      locations.map((l, i) => {
        if (i > 0) {
          fetchMore({ variables: l.id }).then(({ data, error, loading }) => {
            if (data) {
              setData(prevState => ({
                ...prevState,
                [l.code]: (data as CommonAirQualityIndexQuery)
                  .commonAirQualityIndex
              }));
            } else if (error) {
              setError(error);
            } else if (loading) {
              setLoading(true);
            }
          });
        }
      });
    }
    setLoading(false);
  }, [locations, fetchMore]);

  return { data, loading, error };
}
