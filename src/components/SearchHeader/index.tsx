import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PlaceType } from "../Autocomplete/model";
import { Autocomplete } from "../Autocomplete";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2)
  }
}));

export const SearchHeader = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState<PlaceType[]>([]);
  return (
    <div className={classes.root}>
      <Autocomplete value={value} setValue={setValue} />
    </div>
  );
};
