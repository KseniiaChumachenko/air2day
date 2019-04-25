import React from "react";
import { SensorListComponent } from "../../generated/graphql";

const Providers = () => (
  <SensorListComponent>
    {({ data, loading, error }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error</div>;
      }
      if (data) {
        const { sensors } = data;
        return (
          sensors && (
            <div>
              {sensors.map(sensor => sensor && sensor.id + `${<br/>} `)}
            </div>
          )
        );
      }
    }}
  </SensorListComponent>
);

export default class Home extends React.Component {
  render() {
    return <Providers/>;
  }
}
