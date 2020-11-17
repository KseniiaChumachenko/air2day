import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import logo from "../assets/Combined_logo.png";
import { useClearSearchData } from "../../../store/SearchDataProvider";

const useStyles = makeStyles(theme => ({
  root: {
    alignSelf: "center",
    justifyContent: "center",
    display: "flex"
  },
  logo: {
    height: 30,
    width: 200,
    margin: theme.spacing(2),
    alignSelf: "center",
    display: "flex",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export const Logo = () => {
  const classes = useStyles();
  const history = useHistory();
  const { clearSearchData } = useClearSearchData();

  const handleClickLogo = () => {
    clearSearchData();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <img
        src={logo}
        alt={"logo"}
        className={classes.logo}
        onClick={handleClickLogo}
      />
    </div>
  );
};
