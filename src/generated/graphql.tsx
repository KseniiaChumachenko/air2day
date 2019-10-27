export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  OffsetDateTime: any,
};


export type Provider = {
  abbr?: Maybe<Scalars['String']>,
  id: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  sensors?: Maybe<Array<Maybe<Sensor>>>,
  web?: Maybe<Scalars['String']>,
};

export type Query = {
  commonAirQualityIndex?: Maybe<Scalars['Int']>,
  interpolateData?: Maybe<Array<Maybe<SensorData>>>,
  interpolatedCommonAirQualityIndex?: Maybe<Scalars['Int']>,
  provider?: Maybe<Provider>,
  providers?: Maybe<Array<Maybe<Provider>>>,
  providersCount?: Maybe<Scalars['Int']>,
  sensor?: Maybe<Sensor>,
  sensorByCode?: Maybe<Sensor>,
  sensorData?: Maybe<Array<Maybe<SensorData>>>,
  sensors?: Maybe<Array<Maybe<Sensor>>>,
  sensorsCount?: Maybe<Scalars['Int']>,
};


export type QueryCommonAirQualityIndexArgs = {
  sensorId?: Maybe<Scalars['String']>
};


export type QueryInterpolateDataArgs = {
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  time?: Maybe<Scalars['OffsetDateTime']>
};


export type QueryInterpolatedCommonAirQualityIndexArgs = {
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>
};


export type QueryProviderArgs = {
  id?: Maybe<Scalars['String']>
};


export type QuerySensorArgs = {
  id?: Maybe<Scalars['String']>
};


export type QuerySensorByCodeArgs = {
  code?: Maybe<Scalars['String']>
};


export type QuerySensorDataArgs = {
  from?: Maybe<Scalars['OffsetDateTime']>,
  sensorId?: Maybe<Scalars['String']>,
  to?: Maybe<Scalars['OffsetDateTime']>
};

export type Sensor = {
  altitude?: Maybe<Scalars['Float']>,
  code?: Maybe<Scalars['String']>,
  id: Scalars['String'],
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  provider?: Maybe<Provider>,
  sensorData?: Maybe<Array<Maybe<SensorData>>>,
  web?: Maybe<Scalars['String']>,
};


export type SensorSensorDataArgs = {
  from?: Maybe<Scalars['OffsetDateTime']>,
  to?: Maybe<Scalars['OffsetDateTime']>
};

export type SensorData = {
  from?: Maybe<Scalars['OffsetDateTime']>,
  hourAvg?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['String']>,
  pollutant?: Maybe<Scalars['String']>,
  sensorIds?: Maybe<Array<Maybe<Scalars['String']>>>,
  to?: Maybe<Scalars['OffsetDateTime']>,
  value?: Maybe<Scalars['Float']>,
};

export type ChartRepresentationQueryVariables = {
  from?: Maybe<Scalars['OffsetDateTime']>,
  to?: Maybe<Scalars['OffsetDateTime']>,
  sensorId?: Maybe<Scalars['String']>
};


export type ChartRepresentationQuery = { sensorData: Maybe<Array<Maybe<Pick<SensorData, 'from' | 'pollutant' | 'value'>>>> };

export type DataTableQueryVariables = {
  from?: Maybe<Scalars['OffsetDateTime']>,
  to?: Maybe<Scalars['OffsetDateTime']>,
  sensorId?: Maybe<Scalars['String']>
};


export type DataTableQuery = { sensorData: Maybe<Array<Maybe<Pick<SensorData, 'from' | 'to' | 'pollutant' | 'hourAvg' | 'value'>>>> };

export type SensorListQueryVariables = {};


export type SensorListQuery = { sensors: Maybe<Array<Maybe<Pick<Sensor, 'code' | 'id'>>>> };

export type SensorInfoQueryVariables = {
  id?: Maybe<Scalars['String']>
};


export type SensorInfoQuery = { sensor: Maybe<Pick<Sensor, 'code' | 'altitude' | 'latitude' | 'longitude' | 'web'>> };

export type SensorsQueryVariables = {};


export type SensorsQuery = { sensors: Maybe<Array<Maybe<Pick<Sensor, 'code' | 'altitude' | 'latitude' | 'longitude' | 'web' | 'id'>>>> };
