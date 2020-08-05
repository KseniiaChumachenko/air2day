import React from "react";

import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import useStyles from "./styles";
import { useLanguageSetup } from "../../hooks/useLanguageSetup";

interface CardViewProps {
  media: React.ReactNode;
  text: React.ReactNode;
}

export const CardView = ({ text, media }: CardViewProps) => {
  const { locale } = useLanguageSetup();
  const classes = useStyles({ locale });

  return (
    <Card className={classes.root}>
      <CardContent className={classes.media}>
        <Typography variant={"h3"}>{media}</Typography>
      </CardContent>
      <Divider />
      <CardContent className={classes.content}>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );
};
