import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Container, Typography } from "@material-ui/core";

import { CardView } from "./Card";
import useStyles from "./styles";
import messages from "./messages";
import { ScrollableContainer } from "../../components/ScrollableContainer";
import { useTabTitle } from "../../hooks/useTabTitle";

export const Landing = () => {
  const classes = useStyles({});
  useTabTitle('Home');

  return (
    <ScrollableContainer>
      <Container maxWidth={false} className={classes.container}>
        <Container className={classes.gridContainer}>
          <Typography
            variant={"h3"}
            className={classes.title}
            color={"primary"}
          >
            <FormattedHTMLMessage {...messages.title} />
          </Typography>
          <Typography
            variant={"h4"}
            className={classes.subtitle}
            color={"secondary"}
          >
            <FormattedHTMLMessage {...messages.subtitle} />
          </Typography>
          <Typography
            variant={"h5"}
            className={classes.intro}
            color={"textPrimary"}
          >
            <FormattedHTMLMessage {...messages.intro1} />
          </Typography>
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
    </ScrollableContainer>
  );
};
