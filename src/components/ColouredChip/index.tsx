import React from "react";
import { Chip, ChipProps, makeStyles, useTheme } from "@material-ui/core";
import { analogousColors } from "../../store/ThemeProvider/theme";
import { Palette } from "@material-ui/core/styles/createPalette";

export enum SemanticNames {
  success,
  warning,
  error
}

interface StyledChip {
  colourIndex?: number;
  colorByName?: SemanticNames;
  palette?: Palette;
}

const colorByIndex = ({ colorByName, colourIndex, palette }: StyledChip) => {
  if (colorByName === SemanticNames.success) {
    return palette.success.main;
  } else if (colorByName === SemanticNames.warning) {
    return palette.warning.main;
  } else if (colorByName === SemanticNames.error) {
    return palette.error.main;
  } else return analogousColors[colourIndex];
};

const useStyles = makeStyles(theme => ({
  root: {
    color: colorByIndex,
    borderColor: colorByIndex
  },
  icon: {
    color: colorByIndex
  }
}));

type ColouredChipProps = ChipProps & StyledChip;

export const ColouredChip = ({
  colourIndex = 0,
  colorByName,
  ...restProps
}: ColouredChipProps) => {
  const { palette } = useTheme();
  const { root, icon } = useStyles({ colorByName, colourIndex, palette });

  return (
    <Chip
      size={"small"}
      classes={{ root: root, deleteIcon: icon }}
      {...restProps}
    />
  );
};
