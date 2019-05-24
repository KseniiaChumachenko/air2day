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

export type Provider = {
  abbr?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  sensors?: Maybe<Array<Maybe<Sensor>>>;
  web?: Maybe<Scalars["String"]>;
};

export type Query = {
  commonAirQualityIndex?: Maybe<Scalars["Int"]>;
  interpolateData?: Maybe<Array<Maybe<SensorData>>>;
  interpolatedCommonAirQualityIndex?: Maybe<Scalars["Int"]>;
  provider?: Maybe<Provider>;
  providers?: Maybe<Array<Maybe<Provider>>>;
  providersCount?: Maybe<Scalars["Int"]>;
  sensor?: Maybe<Sensor>;
  sensorByCode?: Maybe<Sensor>;
  sensorData?: Maybe<Array<Maybe<SensorData>>>;
  sensors?: Maybe<Array<Maybe<Sensor>>>;
  sensorsCount?: Maybe<Scalars["Int"]>;
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

export type Sensor = {
  altitude?: Maybe<Scalars["Float"]>;
  code?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  provider?: Maybe<Provider>;
  sensorData?: Maybe<Array<Maybe<SensorData>>>;
  web?: Maybe<Scalars["String"]>;
};

export type SensorSensorDataArgs = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
};

export type SensorData = {
  from?: Maybe<Scalars["OffsetDateTime"]>;
  hourAvg?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["String"]>;
  pollutant?: Maybe<Scalars["String"]>;
  sensorIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
  value?: Maybe<Scalars["Float"]>;
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
          | "code"
          | "altitude"
          | "latitude"
          | "longitude"
          | "altitude"
          | "web"
          | "id"
        >
      >
    >
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

export const ChartRepresentationComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        ChartRepresentationQuery,
        ChartRepresentationQueryVariables
      >,
      "query"
    >,
    "variables"
  > & { variables?: ChartRepresentationQueryVariables }
) => (
  <ReactApollo.Query<
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables
  >
    query={ChartRepresentationDocument}
    {...props}
  />
);

export type ChartRepresentationProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables
  >
> &
  TChildProps;
export function withChartRepresentation<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables,
    ChartRepresentationProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ChartRepresentationQuery,
    ChartRepresentationQueryVariables,
    ChartRepresentationProps<TChildProps>
  >(ChartRepresentationDocument, {
    alias: "withChartRepresentation",
    ...operationOptions
  });
}
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

export const DataTableComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<DataTableQuery, DataTableQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables?: DataTableQueryVariables }
) => (
  <ReactApollo.Query<DataTableQuery, DataTableQueryVariables>
    query={DataTableDocument}
    {...props}
  />
);

export type DataTableProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<DataTableQuery, DataTableQueryVariables>
> &
  TChildProps;
export function withDataTable<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DataTableQuery,
    DataTableQueryVariables,
    DataTableProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    DataTableQuery,
    DataTableQueryVariables,
    DataTableProps<TChildProps>
  >(DataTableDocument, {
    alias: "withDataTable",
    ...operationOptions
  });
}
export const SensorListDocument = gql`
  query SensorList {
    sensors {
      code
      id
    }
  }
`;

export const SensorListComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<SensorListQuery, SensorListQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables?: SensorListQueryVariables }
) => (
  <ReactApollo.Query<SensorListQuery, SensorListQueryVariables>
    query={SensorListDocument}
    {...props}
  />
);

export type SensorListProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<SensorListQuery, SensorListQueryVariables>
> &
  TChildProps;
export function withSensorList<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SensorListQuery,
    SensorListQueryVariables,
    SensorListProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    SensorListQuery,
    SensorListQueryVariables,
    SensorListProps<TChildProps>
  >(SensorListDocument, {
    alias: "withSensorList",
    ...operationOptions
  });
}
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

export const SensorInfoComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<SensorInfoQuery, SensorInfoQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables?: SensorInfoQueryVariables }
) => (
  <ReactApollo.Query<SensorInfoQuery, SensorInfoQueryVariables>
    query={SensorInfoDocument}
    {...props}
  />
);

export type SensorInfoProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<SensorInfoQuery, SensorInfoQueryVariables>
> &
  TChildProps;
export function withSensorInfo<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SensorInfoQuery,
    SensorInfoQueryVariables,
    SensorInfoProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    SensorInfoQuery,
    SensorInfoQueryVariables,
    SensorInfoProps<TChildProps>
  >(SensorInfoDocument, {
    alias: "withSensorInfo",
    ...operationOptions
  });
}
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

export const SensorsComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<SensorsQuery, SensorsQueryVariables>, "query">,
    "variables"
  > & { variables?: SensorsQueryVariables }
) => (
  <ReactApollo.Query<SensorsQuery, SensorsQueryVariables>
    query={SensorsDocument}
    {...props}
  />
);

export type SensorsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<SensorsQuery, SensorsQueryVariables>
> &
  TChildProps;
export function withSensors<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SensorsQuery,
    SensorsQueryVariables,
    SensorsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    SensorsQuery,
    SensorsQueryVariables,
    SensorsProps<TChildProps>
  >(SensorsDocument, {
    alias: "withSensors",
    ...operationOptions
  });
}
