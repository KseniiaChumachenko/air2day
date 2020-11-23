import React, { SetStateAction } from "react";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography
} from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { UseRemappedDataResults } from "../../model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between"
    },
    title: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    selectHourAvg: {
      width: 120
    }
  })
);

interface HeaderProps extends Pick<UseRemappedDataResults, "hourAvgs"> {
  title: React.ReactNode;
  hourAvg: number;
  setHourAvg: React.Dispatch<SetStateAction<number>>;
}

export const Header = ({
  title,
  hourAvgs,
  hourAvg,
  setHourAvg
}: HeaderProps) => {
  const classes = useStyles({});

  const handleHourAvgChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setHourAvg(event.target.value as number);
  };

  return (
    <div className={classes.header}>
      <Typography className={classes.title} variant="h6" component="div">
        <Trans>{title}</Trans>
      </Typography>
      <FormControl className={classes.selectHourAvg}>
        <InputLabel>
          <Trans>Per hour average</Trans>
        </InputLabel>
        <Select value={hourAvg} onChange={handleHourAvgChange}>
          {hourAvgs.map((h, index) => (
            <MenuItem value={h} key={index}>
              {h}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
