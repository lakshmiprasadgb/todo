import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const LinearLoader = ({ isLoading }) => {
  const classes = useStyles();
  if (!isLoading) return null;
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
};

export default LinearLoader;
