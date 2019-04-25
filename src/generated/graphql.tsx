export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  OffsetDateTime: any;
  /** Long type */
  Long: any;
};

export type Provider = {
  abbr?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  sensors?: Maybe<Array<Maybe<Sensor>>>;
  web?: Maybe<Scalars["String"]>;
};

export type Query = {
  provider?: Maybe<Provider>;
  providers?: Maybe<Array<Maybe<Provider>>>;
  providersCount?: Maybe<Scalars["Long"]>;
  sensor?: Maybe<Sensor>;
  sensorByCode?: Maybe<Sensor>;
  sensorData?: Maybe<Array<Maybe<SensorData>>>;
  sensors?: Maybe<Array<Maybe<Sensor>>>;
  sensorsCount?: Maybe<Scalars["Long"]>;
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
  id: Scalars["String"];
  pm10?: Maybe<Scalars["Float"]>;
  pm2_5?: Maybe<Scalars["Float"]>;
  to?: Maybe<Scalars["OffsetDateTime"]>;
};
export type SensorListQueryVariables = {};

export type SensorListQuery = { __typename?: "Query" } & {
  sensors: Maybe<Array<Maybe<{ __typename?: "Sensor" } & Pick<Sensor,
    "id" | "code" | "latitude" | "longitude" | "altitude" | "web">>>>;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const SensorListDocument = gql`
  query SensorList {
    sensors {
      id
      code
      latitude
      longitude
      altitude
      web
    }
  }
`;

export const SensorListComponent = (
  props: Omit<Omit<ReactApollo.QueryProps<SensorListQuery, SensorListQueryVariables>,
    "query">,
    "variables"> & { variables?: SensorListQueryVariables }
) => (
  <ReactApollo.Query<SensorListQuery, SensorListQueryVariables>
    query={SensorListDocument}
    {...props}
  />
);

export type SensorListProps<TChildProps = {}> =
  Partial<ReactApollo.DataProps<SensorListQuery, SensorListQueryVariables>>
  &
  TChildProps;

export function withSensorList<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<TProps,
    SensorListQuery,
    SensorListQueryVariables,
    SensorListProps<TChildProps>>
) {
  return ReactApollo.withQuery<TProps,
    SensorListQuery,
    SensorListQueryVariables,
    SensorListProps<TChildProps>>(SensorListDocument, operationOptions);
}
