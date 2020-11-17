import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const nativeGoogleMapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

export const useStyles = makeStyles((theme: Theme) =>
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
