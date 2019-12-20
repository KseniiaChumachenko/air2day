import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  OffsetDateTime: any;
};

export type Query = {
  __typename?: "Query";
  commonAirQualityIndex?: Maybe<Scalars["Int"]>;
  interpolateData?: Maybe<Array<Maybe<SensorData>>>;
  interpolatedCommonAirQualityIndex?: Maybe<Scalars["Int"]>;
  provider?: Maybe<SensorProvider>;
  providers?: Maybe<Array<Maybe<SensorProvider>>>;
  providersCount?: Maybe<Scalars["Int"]>;
  sensor?: Maybe<Sensor>;
  sensorByCode?: Maybe<Sensor>;
  sensorData?: Maybe<Array<Maybe<SensorData>>>;
  sensors?: Maybe<Array<Maybe<Sensor>>>;
  sensorsCount?: Maybe<Scalars["Int"]>;
  weatherData?: Maybe<Array<Maybe<WeatherData>>>;
};

export type QueryCommonAirQualityIndexArgs = {
  sensorId?: Maybe<Scalars["String"]>;
};

export type QueryInterpolateDataArgs = {
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  time?: Maybe<Scalars["OffsetDateTime"]>;
};

export type QueryInterpolatedCommonAirQualityIndexArgs = {
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
};

export type QueryProviderArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type QuerySensorArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type QuerySensorByCodeArgs = {
  code?: Maybe<Scalars["String"]>;
};

export type QuerySensorDataArgs = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  sensorId?: Maybe<Scalars["String"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
};

export type QueryWeatherDataArgs = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
};

export type Sensor = {
  __typename?: "Sensor";
  altitude?: Maybe<Scalars["Float"]>;
  code?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  provider?: Maybe<SensorProvider>;
  sensorData?: Maybe<Array<Maybe<SensorData>>>;
  web?: Maybe<Scalars["String"]>;
};

export type SensorSensorDataArgs = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
};

export type SensorData = {
  __typename?: "SensorData";
  from?: Maybe<Scalars["OffsetDateTime"]>;
  hourAvg?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["String"]>;
  pollutant?: Maybe<Scalars["String"]>;
  sensorIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
  value?: Maybe<Scalars["Float"]>;
};

export type SensorProvider = {
  __typename?: "SensorProvider";
  abbr?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  sensors?: Maybe<Array<Maybe<Sensor>>>;
  web?: Maybe<Scalars["String"]>;
};

export type WeatherData = {
  __typename?: "WeatherData";
  datetime?: Maybe<Scalars["OffsetDateTime"]>;
  humidity?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["String"]>;
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  pressure?: Maybe<Scalars["Int"]>;
  temperature?: Maybe<Scalars["Int"]>;
  weatherCondition?: Maybe<Scalars["String"]>;
  windDirection?: Maybe<Scalars["String"]>;
  windSpeedString?: Maybe<Scalars["String"]>;
};

export type ChartRepresentationQueryVariables = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
  sensorId?: Maybe<Scalars["String"]>;
};

export type ChartRepresentationQuery = { __typename?: "Query" } & {
  sensorData: Maybe<
    Array<
      Maybe<
        { __typename?: "SensorData" } & Pick<
          SensorData,
          "from" | "pollutant" | "value"
        >
      >
    >
  >;
};

export type DataTableQueryVariables = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
  sensorId?: Maybe<Scalars["String"]>;
};

export type DataTableQuery = { __typename?: "Query" } & {
  sensorData: Maybe<
    Array<
      Maybe<
        { __typename?: "SensorData" } & Pick<
          SensorData,
          "from" | "to" | "pollutant" | "hourAvg" | "value"
        >
      >
    >
  >;
};

export type SensorListQueryVariables = {};

export type SensorListQuery = { __typename?: "Query" } & {
  sensors: Maybe<
    Array<Maybe<{ __typename?: "Sensor" } & Pick<Sensor, "code" | "id">>>
  >;
};

export type SensorInfoQueryVariables = {
  id?: Maybe<Scalars["String"]>;
};

export type SensorInfoQuery = { __typename?: "Query" } & {
  sensor: Maybe<
    { __typename?: "Sensor" } & Pick<
      Sensor,
      "code" | "altitude" | "latitude" | "longitude" | "web"
    >
  >;
};

export type SensorsQueryVariables = {};

export type SensorsQuery = { __typename?: "Query" } & {
  sensors: Maybe<
    Array<
      Maybe<
        { __typename?: "Sensor" } & Pick<
          Sensor,
          "code" | "altitude" | "latitude" | "longitude" | "web" | "id"
        >
      >
    >
  >;
};

export const ChartRepresentationDocument = gql`
  query ChartRepresentation(
    $from: OffsetDateTime
    $to: OffsetDateTime
    $sensorId: String
  ) {
    sensorData(from: $from, to: $to, sensorId: $sensorId) {
      from
      pollutant
      value
    }
  }
`;
export function useChartRepresentationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables
  >(ChartRepresentationDocument, baseOptions);
}
export function useChartRepresentationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables
  >(ChartRepresentationDocument, baseOptions);
}
export type ChartRepresentationQueryHookResult = ReturnType<
  typeof useChartRepresentationQuery
>;
export type ChartRepresentationLazyQueryHookResult = ReturnType<
  typeof useChartRepresentationLazyQuery
>;
export type ChartRepresentationQueryResult = ApolloReactCommon.QueryResult<
  ChartRepresentationQuery,
  ChartRepresentationQueryVariables
>;
export const DataTableDocument = gql`
  query DataTable(
    $from: OffsetDateTime
    $to: OffsetDateTime
    $sensorId: String
  ) {
    sensorData(from: $from, to: $to, sensorId: $sensorId) {
      from
      to
      pollutant
      hourAvg
      value
    }
  }
`;
export function useDataTableQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    DataTableQuery,
    DataTableQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<DataTableQuery, DataTableQueryVariables>(
    DataTableDocument,
    baseOptions
  );
}
export function useDataTableLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    DataTableQuery,
    DataTableQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<DataTableQuery, DataTableQueryVariables>(
    DataTableDocument,
    baseOptions
  );
}
export type DataTableQueryHookResult = ReturnType<typeof useDataTableQuery>;
export type DataTableLazyQueryHookResult = ReturnType<
  typeof useDataTableLazyQuery
>;
export type DataTableQueryResult = ApolloReactCommon.QueryResult<
  DataTableQuery,
  DataTableQueryVariables
>;
export const SensorListDocument = gql`
  query SensorList {
    sensors {
      code
      id
    }
  }
`;
export function useSensorListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SensorListQuery,
    SensorListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SensorListQuery, SensorListQueryVariables>(
    SensorListDocument,
    baseOptions
  );
}
export function useSensorListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SensorListQuery,
    SensorListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SensorListQuery,
    SensorListQueryVariables
  >(SensorListDocument, baseOptions);
}
export type SensorListQueryHookResult = ReturnType<typeof useSensorListQuery>;
export type SensorListLazyQueryHookResult = ReturnType<
  typeof useSensorListLazyQuery
>;
export type SensorListQueryResult = ApolloReactCommon.QueryResult<
  SensorListQuery,
  SensorListQueryVariables
>;
export const SensorInfoDocument = gql`
  query SensorInfo($id: String) {
    sensor(id: $id) {
      code
      altitude
      latitude
      longitude
      web
    }
  }
`;
export function useSensorInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SensorInfoQuery,
    SensorInfoQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SensorInfoQuery, SensorInfoQueryVariables>(
    SensorInfoDocument,
    baseOptions
  );
}
export function useSensorInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SensorInfoQuery,
    SensorInfoQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SensorInfoQuery,
    SensorInfoQueryVariables
  >(SensorInfoDocument, baseOptions);
}
export type SensorInfoQueryHookResult = ReturnType<typeof useSensorInfoQuery>;
export type SensorInfoLazyQueryHookResult = ReturnType<
  typeof useSensorInfoLazyQuery
>;
export type SensorInfoQueryResult = ApolloReactCommon.QueryResult<
  SensorInfoQuery,
  SensorInfoQueryVariables
>;
export const SensorsDocument = gql`
  query Sensors {
    sensors {
      code
      altitude
      latitude
      longitude
      altitude
      web
      id
    }
  }
`;
export function useSensorsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SensorsQuery,
    SensorsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SensorsQuery, SensorsQueryVariables>(
    SensorsDocument,
    baseOptions
  );
}
export function useSensorsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SensorsQuery,
    SensorsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SensorsQuery, SensorsQueryVariables>(
    SensorsDocument,
    baseOptions
  );
}
export type SensorsQueryHookResult = ReturnType<typeof useSensorsQuery>;
export type SensorsLazyQueryHookResult = ReturnType<typeof useSensorsLazyQuery>;
export type SensorsQueryResult = ApolloReactCommon.QueryResult<
  SensorsQuery,
  SensorsQueryVariables
>;
