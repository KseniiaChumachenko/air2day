import React from "react";
import { Trans } from "@lingui/macro";
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";

import { useGetIndexes } from "./useGetIndexes";
import { analogousColors } from "../../../../store/ThemeProvider/theme";
import Link from "@material-ui/core/Link";
import {
  ColouredChip,
  SemanticNames
} from "../../../../components/ColouredChip";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-around"
  },
  indexCardRoot: {
    padding: theme.spacing(2)
  }
}));

function friendlyIndexExplanation(index: number) {
  if (index > 0 && index <= 25) {
    return (
      <ColouredChip
        variant={"outlined"}
        colorByName={SemanticNames.success}
        label={<Trans>Very good</Trans>}
      />
    );
  } else if (index > 25 && index <= 50) {
    return (
      <ColouredChip
        variant={"outlined"}
        colorByName={SemanticNames.success}
        label={<Trans>Good</Trans>}
      />
    );
  } else if (index > 50 && index <= 75) {
    return (
      <ColouredChip
        variant={"outlined"}
        colorByName={SemanticNames.warning}
        label={<Trans>Acceptable</Trans>}
      />
    );
  } else if (index > 75 && index <= 100) {
    return (
      <ColouredChip
        variant={"outlined"}
        colorByName={SemanticNames.error}
        label={<Trans>Bad</Trans>}
      />
    );
  } else if (index > 100) {
    return (
      <ColouredChip
        variant={"outlined"}
        colorByName={SemanticNames.error}
        label={<Trans>Very bad</Trans>}
      />
    );
  }
}

// TODO loading, error
export const AQIndexesWidget = () => {
  const { data, loading, error } = useGetIndexes();
  const { root, mainContent, indexCardRoot } = useStyles();

  const customColor = (i: number) => ({ color: analogousColors[i] });

  return (
    <Card className={root}>
      <CardHeader title={<Trans>Common Air Quality Indexes</Trans>} />
      <CardContent>
        <Typography>
          <Trans>
            The Common Annual Air Quality Index provides a general overview of
            the air quality situation in a given city all the year through and
            regarding to the European norms.
            <br />
            It is also calculated both for background and traffic conditions,
            but its principle of calculation is different from the hourly and
            daily indices. It is presented as a distance to a target index, with
            this target being derived from the EU directives (annual air quality
            standards and objectives):
            <br />
            <ul>
              <li>
                If the index is higher than 1: for one or more pollutants, the
                limit values are not met.
              </li>
              <li>
                If the index is below 1: on average, the limit values are met.
              </li>
            </ul>
            The annual index is aimed at better taking into account long term
            exposure to air pollution based on distance to the target set by the
            EU annual norms, those norms being linked most of the time to
            recommendations and health protection set up by World Health
            Organisation.
          </Trans>
          <Link
            href={
              "https://www.airqualitynow.eu/download/CITEAIR-Comparing_Urban_Air_Quality_across_Borders.pdf"
            }
          >
            <Trans> [Source]</Trans>
          </Link>
        </Typography>
      </CardContent>
      <CardContent className={mainContent}>
        {data &&
          Object.keys(data).map((k, i) => (
            <Card
              className={indexCardRoot}
              variant={"outlined"}
              elevation={0}
              key={i}
            >
              <CardHeader title={k} style={customColor(i)} />
              <CardContent>
                <Typography variant={"h1"} style={customColor(i)}>
                  {data[k]}
                </Typography>
                {friendlyIndexExplanation(data[k])}
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
};
