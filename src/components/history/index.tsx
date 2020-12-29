import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // bottomNav: {
  //   bottom: 0,
  //   position: "fixed",
  //   width: "100vw",
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // list: {
  //   width: "250px",
  // },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardContent: {
    // display: "grid",
    // gridTemplateColumns: "1fr auto",
    // paddingBottom: 0,
  },
  cardActions: {
    justifyContent: "center",
  },
  fab: {
    bottom: 20,
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
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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
}));

const cards = [1, 2, 3];

const History: React.FC<{ user: any }> = ({ user }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classes.cardHeader} title="Problem Title">
                  <Typography gutterBottom variant="h5" component="h2">
                    Problem Title
                  </Typography>
                  <Avatar className={classes.easy}>E</Avatar>
                </div>
                <div className={classes.cardCenter}>
                  <div>
                    <Typography variant="overline" display="block">
                      2 Days Ago
                    </Typography>
                    <Typography variant="overline" display="block">
                      34 mins
                    </Typography>
                  </div>
                  <div>
                    <div className={classes.chips}>
                      <Chip label="Binary Search" color="secondary" />
                      <Chip label="DFS" color="secondary" />
                      <Chip label="Binary Search2" color="secondary" />
                      <Chip label="DFS2" color="secondary" />
                      <Chip label="Binary Search3" color="secondary" />
                      <Chip label="DFS3" color="secondary" />
                    </div>
                    <div className={classes.chips}>
                      <Chip label="Trie" />
                      <Chip label="Array" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    // <Container>
    //   <Grid container spacing={3}>
    //     <Grid item xs={12} spacing={3}>
    //       <Paper className={classes.paper}>item</Paper>
    //     </Grid>
    //     <Grid item xs={12} spacing={3}>
    //       <Paper className={classes.paper}>item</Paper>
    //     </Grid>
    //     <Grid item xs={12} spacing={3}>
    //       <Paper className={classes.paper}>item</Paper>
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default History;
