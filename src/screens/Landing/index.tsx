import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Container } from "@material-ui/core";

import { CardView } from "./Card";
import useStyles from "./styles";
import messages from "./messages";

export const Landing = () => {
  const classes = useStyles({});

  return (
    <Container maxWidth={false} className={classes.container}>
      <Container className={classes.gridContainer}>
        <div className={classes.title}>
          <FormattedHTMLMessage {...messages.title} />
        </div>
        <div className={classes.subtitle}>
          <FormattedHTMLMessage {...messages.subtitle} />
        </div>
        <div className={classes.intro}>
          <FormattedHTMLMessage {...messages.intro1} />
        </div>
      </Container>

      <Container className={classes.cardView}>
        <CardView
          media={"-2"}
          text={<FormattedHTMLMessage {...messages.cardOne} />}
        />
        <CardView
          media={"-3.7m"}
          text={<FormattedHTMLMessage {...messages.cardTwo} />}
        />
        <CardView
          media={"92%"}
          text={<FormattedHTMLMessage {...messages.cardThree} />}
        />
      </Container>
    </Container>
  );
};
