import React from "react";
import { Chip, ChipProps, makeStyles } from "@material-ui/core";
import { analogousColors } from "../../store/ThemeProvider/theme";

interface StyledChip {
  colourIndex: number;
}

const colorByIndex = ({ colourIndex }: StyledChip) =>
  analogousColors[colourIndex];

const useStyles = makeStyles(theme => ({
  root: {
    color: colorByIndex,
    borderColor: colorByIndex
  },
  icon: {
    color: colorByIndex
  }
}));

interface ColouredChipProps extends ChipProps {
  colourIndex?: number;
}

export const ColouredChip = ({
  colourIndex = 0,
  ...restProps
}: ColouredChipProps) => {
  const classes = useStyles({ colourIndex });

  return (
    <Chip
      classes={{ root: classes.root, deleteIcon: classes.icon }}
      {...restProps}
    />
  );
};
