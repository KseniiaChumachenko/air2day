import React from "react";
import { SensorListComponent } from "../../generated/graphql";
import { Loading } from "../components";
import ErrorBanner from "../components/ErrorBanner";

const Providers = () => (
  <SensorListComponent>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loading />;
      }
      if (error) {
        return <ErrorBanner />;
      }
      if (data) {
        const { sensors } = data;
        return (
          sensors && (
            <div>
              {sensors.map(sensor => sensor && sensor.id + `${<br />} `)}
            </div>
          )
        );
      }
    }}
  </SensorListComponent>
);

export default class Home extends React.Component {
  render() {
    return <Providers/>
  }
}
