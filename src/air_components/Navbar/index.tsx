import React, {ChangeEvent} from "react";

import {Link, RouteComponentProps, withRouter} from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {WithStyles, withStyles} from "@material-ui/core/styles";
import styles from "./styles";

import {FormattedMessage} from "react-intl";
import messages from "./messages";
import PropTypes from "prop-types";

type NavBarProps = RouteComponentProps & WithStyles<typeof styles>;

class NavBar extends React.PureComponent<NavBarProps> {
    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        value: "/"
    };

    handleChange = (event: ChangeEvent<{}>, value: any) => {
        this.setState({value});
        this.context.router.history.push(value);
    };

    render() {
        const {value} = this.state;
        const {classes} = this.props;
        const {router} = this.context;

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
                    <div className={classes.grow}/>
                    <Tabs
                        value={this.context.router.history.location.pathname}
                        onChange={this.handleChange}
                    >
                        <Tab label={<FormattedMessage {...messages.home} />} value="/"/>
                        <Tab
                            label={<FormattedMessage {...messages.locations} />}
                            value="/locations"
                        />
                        <Tab
                            label={<FormattedMessage {...messages.contacts} />}
                            value="/contactus"
                        />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NavBar));
