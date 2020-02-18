import React from "react";
import { Trans } from "@lingui/macro";
import { Container, Typography } from "@material-ui/core";

import { CardView } from "./Card";
import useStyles from "./styles";
import { ScrollableContainer } from "../../components/ScrollableContainer";
import { useTabTitle } from "../../hooks/useTabTitle";

export const Landing = () => {
  const classes = useStyles({});
  useTabTitle("Home");

  return (
    <ScrollableContainer>
      <Container maxWidth={false} className={classes.container}>
        <Container className={classes.gridContainer}>
          <Typography
            variant={"h3"}
            className={classes.title}
            color={"primary"}
          >
            <Trans>Find & understand</Trans>
          </Typography>
          <Typography
            variant={"h4"}
            className={classes.subtitle}
            color={"secondary"}
          >
            <Trans>what you’re breathing</Trans>
          </Typography>
          <Typography
            variant={"h5"}
            className={classes.intro}
            color={"textPrimary"}
          >
            <Trans>
              We're compensating the lack of fine monitoring of air pollution
              and informing people about current and forthcoming state of air
              quality empowering them to live healthier lives and create more
              sustainable business.
            </Trans>
          </Typography>
        </Container>

        <Container className={classes.cardView}>
          <CardView
            media={"-2"}
            text={
              <Trans>
                Average <b>2 years of life</b> expectancy taken out of major
                European cities inhabitants
              </Trans>
            }
          />
          <CardView
            media={"-3.7m"}
            text={
              <Trans>
                Air pollution kills <b>3.7m</b> people per year worldwide
              </Trans>
            }
          />
          <CardView
            media={"92%"}
            text={
              <Trans>
                <b>92%</b> of the global population live in places with
                unhealthy air quality
              </Trans>
            }
          />
        </Container>
      </Container>
    </ScrollableContainer>
  );
};
