import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import {
  Typography,
  AppBar,
  Tabs,
  Tab,
  WithStyles,
  withStyles
} from "@material-ui/core";

import styles from "./styles";
import messages from "./messages";

type NavBarProps = RouteComponentProps & WithStyles<typeof styles>;

class NavBar extends React.PureComponent<NavBarProps> {
  static contextTypes = {
    router: PropTypes.object
  };
  state = {
    value: "/"
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ value });
    this.context.router.history.push(value);
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    const { router } = this.context;

    return (
      <div className={classes.root}>
        <AppBar position="static" color={"primary"} className={classes.appBar}>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            <Link to="/">
              <FormattedMessage {...messages.title} />
            </Link>
          </Typography>
          <div className={classes.grow} />
          <Tabs
            value={this.context.router.history.location.pathname}
            onChange={this.handleChange}
          >
            <Tab label={<FormattedMessage {...messages.home} />} value="/" />
            <Tab
              label={<FormattedMessage {...messages.locations} />}
              value="/locations"
            />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));
