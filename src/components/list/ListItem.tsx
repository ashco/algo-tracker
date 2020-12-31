import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { green, orange, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { Difficulty, Problem } from "../../models";

const useStyles = makeStyles((theme) => ({
  data: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  },
  cardContent: {
    paddingBottom: 8,
    // display: "grid",
    // gridTemplateColumns: "1fr auto",
    // paddingBottom: 0,
  },
  cardActions: {
    // justifyContent: "flex-end",
  },
  fab: {
    bottom: 70,
    right: 20,
    margin: 0,
    top: "auto",
    left: "auto",
    position: "fixed",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  easy: {
    color: "#fff",
    backgroundColor: green[500],
    margin: theme.spacing(0.5),
    // width: theme.spacing(4),
    // height: theme.spacing(4),
  },
  medium: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
  },
  hard: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  chips: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  cardHeader: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
  },
  cardCenter: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
  },
  margin: {
    margin: theme.spacing(1),
  },
  chipGroup: {
    marginTop: theme.spacing(1),
  },
}));

const DifficultyBadge: React.FC<{ difficulty: Difficulty }> = ({
  difficulty,
}) => {
  const classes = useStyles();

  switch (difficulty) {
    case Difficulty.EASY:
      return <Avatar className={classes.easy}>E</Avatar>;
    case Difficulty.MEDIUM:
      return <Avatar className={classes.medium}>M</Avatar>;
    case Difficulty.HARD:
      return <Avatar className={classes.hard}>H</Avatar>;
    default:
      throw Error("No difficulty");
  }
};

export const ListItem: React.FC<{ data: Problem }> = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item key={data.id} xs={12} md={6}>
      <Card className={classes.data}>
        <CardContent className={classes.cardContent}>
          <div className={classes.cardHeader}>
            <Typography variant="h5" component="h2">
              {data.title}
            </Typography>
            <DifficultyBadge difficulty={data.difficulty} />
          </div>
          <div className={classes.cardCenter}>
            <div>
              <Typography variant="overline" display="block">
                {data.url}
              </Typography>
              <Typography variant="overline" display="block">
                {data.timestamp}
              </Typography>
              <Typography variant="overline" display="block">
                {data.duration}
              </Typography>
            </div>
            <div className={classes.chipGroup}>
              <div className={classes.chips}>
                {data.algorithms.map((algo, i) => {
                  return <Chip label={algo} key={i} color="primary" />;
                })}
              </div>
              <div className={classes.chips}>
                {data.dataStructures.map((ds, i) => {
                  return <Chip label={ds} key={i} color="secondary" />;
                })}
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            View
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push(`/form/${data.id}`)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
