import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const GoButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#4ed964",
    "&:hover": {
      backgroundColor: "#279c39",
    },
  },
}))(Button);

export const CancelButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#ff3a31",
    "&:hover": {
      backgroundColor: "#c1221b",
    },
  },
}))(Button);
