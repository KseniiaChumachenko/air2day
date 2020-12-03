import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
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

export type ChartRepresentationQueryVariables = Exact<{
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
  sensorId?: Maybe<Scalars["String"]>;
}>;

export type ChartRepresentationQuery = { __typename?: "Query" } & {
  sensorData?: Maybe<
    Array<
      Maybe<
        { __typename?: "SensorData" } & Pick<
          SensorData,
          "from" | "pollutant" | "value" | "id"
        >
      >
    >
  >;
};

export type DataTableQueryVariables = Exact<{
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
  sensorId?: Maybe<Scalars["String"]>;
}>;

export type DataTableQuery = { __typename?: "Query" } & {
  sensorData?: Maybe<
    Array<
      Maybe<
        { __typename?: "SensorData" } & Pick<
          SensorData,
          "from" | "to" | "pollutant" | "hourAvg" | "value" | "id" | "sensorIds"
        >
      >
    >
  >;
};

export type SensorInfoQueryVariables = Exact<{
  id?: Maybe<Scalars["String"]>;
}>;

export type SensorInfoQuery = { __typename?: "Query" } & {
  sensor?: Maybe<
    { __typename?: "Sensor" } & Pick<
      Sensor,
      "code" | "altitude" | "latitude" | "longitude" | "web"
    >
  >;
};

export type SensorsQueryVariables = Exact<{ [key: string]: never }>;

export type SensorsQuery = { __typename?: "Query" } & {
  sensors?: Maybe<
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

export type DashboardDataQueryVariables = Exact<{ [key: string]: never }>;

export type DashboardDataQuery = { __typename?: "Query" } & Pick<
  Query,
  "sensorsCount" | "providersCount"
>;

export type SensorsPositionQueryVariables = Exact<{ [key: string]: never }>;

export type SensorsPositionQuery = { __typename?: "Query" } & {
  sensors?: Maybe<
    Array<
      Maybe<
        { __typename?: "Sensor" } & Pick<
          Sensor,
          "id" | "code" | "latitude" | "longitude"
        >
      >
    >
  >;
};

export type CommonAirQualityIndexQueryVariables = Exact<{
  sensorId?: Maybe<Scalars["String"]>;
}>;

export type CommonAirQualityIndexQuery = { __typename?: "Query" } & Pick<
  Query,
  "commonAirQualityIndex"
>;

export type AirQualityIndexByLocationsQueryVariables = Exact<{
  sensorId?: Maybe<Scalars["String"]>;
}>;

export type AirQualityIndexByLocationsQuery = { __typename?: "Query" } & Pick<
  Query,
  "commonAirQualityIndex"
>;

export type AirPolutionPredictionQueryVariables = Exact<{
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  time?: Maybe<Scalars["OffsetDateTime"]>;
}>;

export type AirPolutionPredictionQuery = { __typename?: "Query" } & {
  interpolateData?: Maybe<
    Array<
      Maybe<
        { __typename?: "SensorData" } & Pick<
          SensorData,
          "from" | "hourAvg" | "id" | "pollutant" | "sensorIds" | "to" | "value"
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
      id
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
      id
      sensorIds
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
export const DashboardDataDocument = gql`
  query DashboardData {
    sensorsCount
    providersCount
  }
`;
export function useDashboardDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    DashboardDataQuery,
    DashboardDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    DashboardDataQuery,
    DashboardDataQueryVariables
  >(DashboardDataDocument, baseOptions);
}
export function useDashboardDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    DashboardDataQuery,
    DashboardDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    DashboardDataQuery,
    DashboardDataQueryVariables
  >(DashboardDataDocument, baseOptions);
}
export type DashboardDataQueryHookResult = ReturnType<
  typeof useDashboardDataQuery
>;
export type DashboardDataLazyQueryHookResult = ReturnType<
  typeof useDashboardDataLazyQuery
>;
export type DashboardDataQueryResult = ApolloReactCommon.QueryResult<
  DashboardDataQuery,
  DashboardDataQueryVariables
>;
export const SensorsPositionDocument = gql`
  query SensorsPosition {
    sensors {
      id
      code
      latitude
      longitude
    }
  }
`;
export function useSensorsPositionQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SensorsPositionQuery,
    SensorsPositionQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SensorsPositionQuery,
    SensorsPositionQueryVariables
  >(SensorsPositionDocument, baseOptions);
}
export function useSensorsPositionLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SensorsPositionQuery,
    SensorsPositionQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SensorsPositionQuery,
    SensorsPositionQueryVariables
  >(SensorsPositionDocument, baseOptions);
}
export type SensorsPositionQueryHookResult = ReturnType<
  typeof useSensorsPositionQuery
>;
export type SensorsPositionLazyQueryHookResult = ReturnType<
  typeof useSensorsPositionLazyQuery
>;
export type SensorsPositionQueryResult = ApolloReactCommon.QueryResult<
  SensorsPositionQuery,
  SensorsPositionQueryVariables
>;
export const CommonAirQualityIndexDocument = gql`
  query commonAirQualityIndex($sensorId: String) {
    commonAirQualityIndex(sensorId: $sensorId)
  }
`;
export function useCommonAirQualityIndexQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CommonAirQualityIndexQuery,
    CommonAirQualityIndexQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    CommonAirQualityIndexQuery,
    CommonAirQualityIndexQueryVariables
  >(CommonAirQualityIndexDocument, baseOptions);
}
export function useCommonAirQualityIndexLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CommonAirQualityIndexQuery,
    CommonAirQualityIndexQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CommonAirQualityIndexQuery,
    CommonAirQualityIndexQueryVariables
  >(CommonAirQualityIndexDocument, baseOptions);
}
export type CommonAirQualityIndexQueryHookResult = ReturnType<
  typeof useCommonAirQualityIndexQuery
>;
export type CommonAirQualityIndexLazyQueryHookResult = ReturnType<
  typeof useCommonAirQualityIndexLazyQuery
>;
export type CommonAirQualityIndexQueryResult = ApolloReactCommon.QueryResult<
  CommonAirQualityIndexQuery,
  CommonAirQualityIndexQueryVariables
>;
export const AirQualityIndexByLocationsDocument = gql`
  query airQualityIndexByLocations($sensorId: String) {
    commonAirQualityIndex(sensorId: $sensorId)
  }
`;
export function useAirQualityIndexByLocationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AirQualityIndexByLocationsQuery,
    AirQualityIndexByLocationsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AirQualityIndexByLocationsQuery,
    AirQualityIndexByLocationsQueryVariables
  >(AirQualityIndexByLocationsDocument, baseOptions);
}
export function useAirQualityIndexByLocationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AirQualityIndexByLocationsQuery,
    AirQualityIndexByLocationsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AirQualityIndexByLocationsQuery,
    AirQualityIndexByLocationsQueryVariables
  >(AirQualityIndexByLocationsDocument, baseOptions);
}
export type AirQualityIndexByLocationsQueryHookResult = ReturnType<
  typeof useAirQualityIndexByLocationsQuery
>;
export type AirQualityIndexByLocationsLazyQueryHookResult = ReturnType<
  typeof useAirQualityIndexByLocationsLazyQuery
>;
export type AirQualityIndexByLocationsQueryResult = ApolloReactCommon.QueryResult<
  AirQualityIndexByLocationsQuery,
  AirQualityIndexByLocationsQueryVariables
>;
export const AirPolutionPredictionDocument = gql`
  query airPolutionPrediction(
    $latitude: Float
    $longitude: Float
    $time: OffsetDateTime
  ) {
    interpolateData(latitude: $latitude, longitude: $longitude, time: $time) {
      from
      hourAvg
      id
      pollutant
      sensorIds
      to
      value
    }
  }
`;
export function useAirPolutionPredictionQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AirPolutionPredictionQuery,
    AirPolutionPredictionQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AirPolutionPredictionQuery,
    AirPolutionPredictionQueryVariables
  >(AirPolutionPredictionDocument, baseOptions);
}
export function useAirPolutionPredictionLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AirPolutionPredictionQuery,
    AirPolutionPredictionQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AirPolutionPredictionQuery,
    AirPolutionPredictionQueryVariables
  >(AirPolutionPredictionDocument, baseOptions);
}
export type AirPolutionPredictionQueryHookResult = ReturnType<
  typeof useAirPolutionPredictionQuery
>;
export type AirPolutionPredictionLazyQueryHookResult = ReturnType<
  typeof useAirPolutionPredictionLazyQuery
>;
export type AirPolutionPredictionQueryResult = ApolloReactCommon.QueryResult<
  AirPolutionPredictionQuery,
  AirPolutionPredictionQueryVariables
>;
