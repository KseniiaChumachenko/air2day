import {
  amber,
  blue,
  brown,
  deepPurple,
  green,
  indigo,
  lime,
  pink,
  red,
  teal
} from "@material-ui/core/colors";
export const HUE = 600;
export const color = (number: number) => {

  switch (number) {
    case 0:
      return pink[HUE];
    case 1:
      return blue[HUE];
    case 2:
      return green[HUE];
    case 3:
      return deepPurple[HUE];
    case 4:
      return lime[HUE];
    case 5:
      return amber[HUE];
    case 6:
      return teal[HUE];
    case 7:
      return brown[HUE];
    case 8:
      return red[HUE];
    default:
      return indigo[HUE];
  }
};
