import React, { useCallback, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Map,
  GoogleApiWrapper,
  IMapProps,
  IInfoWindowProps,
  IMarkerProps,
  Marker
} from "google-maps-react";
import {
  createStyles,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
  Theme,
  Typography
} from "@material-ui/core";
import {
  Link as LinkIcon,
  MapOutlined,
  GpsFixedOutlined
} from "@material-ui/icons";
import { Sensor } from "../../graphql/generated/graphql";
import { useSensorGeocoding } from "./useSensorGeocoding";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mapStyles: {
      height: "40vh",
      width: "100%",
      position: "relative"
    },
    header: {
      padding: theme.spacing(2)
    },
    listItem: {
      whiteSpace: "break-spaces",
      overflow: "hidden",
      maxWidth: "300px"
    },
    link: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "300px"
    }
  })
);

interface P extends IMapProps {
  markers?: IMarkerProps[];
  infoWindows?: IInfoWindowProps[];
  handleActiveMarker?(key: number): void;
  activeMarkerData?: Sensor;
}

export const MapContainer = (props: P) => {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const address = useSensorGeocoding(props.activeMarkerData);

  const handleClick = useCallback(
    (event?: any) => {
      setAnchorEl(null);
      anchorEl ? setAnchorEl(null) : setAnchorEl(event.ya.path[2]);
    },
    [anchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.mapStyles}>
      <Map {...props}>
        {props.markers?.map((marker, key) => (
          <Marker
            key={key}
            {...marker}
            onClick={(p?, m?, event?: any) => {
              handleClick(event);
              props.handleActiveMarker(key);
            }}
          />
        ))}
      </Map>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        {props.activeMarkerData && (
          <>
            <Typography className={classes.header}>
              {props.activeMarkerData.code}
            </Typography>
            <Divider variant={"fullWidth"} component={"p"} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"External info"}
                  secondary={
                    <Link
                      target={"_blank"}
                      href={props.activeMarkerData.web}
                      color={"primary"}
                    >
                      <Typography
                        component={"p"}
                        variant={"body2"}
                        className={classes.link}
                      >
                        {props.activeMarkerData.web}
                      </Typography>
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MapOutlined />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItem}
                  primary={address ? address : <Skeleton variant="text" />}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GpsFixedOutlined />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItem}
                  primary={"Latitude"}
                  secondary={props.activeMarkerData.latitude}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <div />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItem}
                  primary={"Longitude"}
                  secondary={props.activeMarkerData.longitude}
                />
              </ListItem>
            </List>
          </>
        )}
      </Popover>
    </div>
  );
};

export const apiKey = "AIzaSyCMq7ChRIjtPzz_QNpiHShMY0dfmpkL8vs";

const LoadingContainer = () => (
  <Skeleton variant={"rect"} height={"40vh"} width={"100%"} />
);

export default GoogleApiWrapper({
  apiKey: apiKey,
  LoadingContainer: LoadingContainer
})(MapContainer);
