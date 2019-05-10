import React from "react";
import { SensorListComponent } from "../../generated/graphql";
import { Loading } from "../components";
import ErrorBanner from "../components/ErrorBanner";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { createStyles, Typography, withStyles } from "@material-ui/core";

const svg = (
  <svg
    width="680"
    height="400"
    viewBox="0 0 680 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.6"
      d="M-47.5647 106.656L420.089 52.8812L472.699 402.794L2.04781e-05 447L-47.5647 106.656Z"
      fill="#64C1FF"
    />
    <path
      opacity="0.6"
      d="M-205 273.039L0.376361 1.18445e-05L679.93 442.616L474.554 715.655L-205 273.039Z"
      fill="#0091EA"
    />
    <path
      d="M268.787 253.982C261.591 219.625 229.523 193.833 191 193.833C160.414 193.833 133.85 210.165 120.621 234.065C88.765 237.252 64 262.645 64 293.417C64 326.379 92.4692 353.167 127.5 353.167H265.083C294.293 353.167 318 330.86 318 303.375C318 277.085 296.304 255.774 268.787 253.982ZM265.083 333.25H127.5C104.111 333.25 85.1667 315.425 85.1667 293.417C85.1667 271.409 104.111 253.583 127.5 253.583H135.014C141.999 230.58 164.33 213.75 191 213.75C223.173 213.75 249.208 238.247 249.208 268.521V273.5H265.083C282.652 273.5 296.833 286.844 296.833 303.375C296.833 319.906 282.652 333.25 265.083 333.25Z"
      fill="white"
    />
  </svg>
);

const styles = () =>
  createStyles({
    container:{
      width: '100%',
      height: '100%',
      display:'flex',
      flexDirection: 'column',
    },
    title: {
      marginTop: '63px',
      marginLeft: '45px',

      fontFamily: "Varela Round",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "45px",
      lineHeight: "54px",
      /* identical to box height */

      letterSpacing: "0.1em",

      color: "#FF4081"
    },
    subtitle: {
      marginLeft: '130px',
      marginTop: '15px',

      fontFamily: "Varela Round",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "30px",
      lineHeight: "36px",
      /* identical to box height */

      letterSpacing: "0.1em",
      color: "#FF79BD"
    },
    intro: {
      width: "605px",
      height: "243px",
      marginTop: "15px",
      marginLeft: '250px',

      fontFamily: "Varela Round",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "35px",
      letterSpacing: "0.05em"
    },
    svgContainer: {
      marginTop: '-20px',
    }
  });

const HomeIntro = withStyles(styles)(({ classes }: any) => (
  <div className={classes.container}>
    <div className={classes.title}>Find & understand</div>
    <div className={classes.subtitle}>what you’re breathing</div>
    <div className={classes.intro}>
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit
      amet est et sapien ullamcorper pharetra.
    </div>
    <div className={classes.svgContainer}>{svg}</div>
  </div>
));

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
          //const { sensors } = data;
          return <HomeIntro />;
        }
      }}
    </SensorListComponent>
  </ScreenWrapper>
);

export default Home;
