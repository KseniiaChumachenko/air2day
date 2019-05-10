import React from "react";
import { SensorListComponent } from "../../generated/graphql";
import { Loading } from "../components";
import ErrorBanner from "../components/ErrorBanner";
import { ScreenWrapper } from "../components/ScreenWrapper";

const Home = () => (
  <ScreenWrapper>
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
  </ScreenWrapper>
);

export default Home;
