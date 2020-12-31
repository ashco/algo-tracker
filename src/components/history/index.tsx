import React from "react";
import { useHistory } from "react-router-dom";
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

import { DataStore } from "aws-amplify";
import { onUpdateProblem } from "../../graphql/subscriptions";
import { Problem } from "../../models";

const useStyles = makeStyles((theme) => ({
  problem: {
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
    justifyContent: "center",
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
  margin: {
    margin: theme.spacing(1),
  },
}));

const History: React.FC<{ user: any }> = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [problems, setProblems] = React.useState<Problem[]>([]);

  React.useEffect(() => {
    async function getProblems() {
      try {
        const theItems = await DataStore.query(Problem);
        setProblems(theItems);
        console.log("Posts retrieved successfully.", theItems);
      } catch (err) {
        console.log("Error retrieving problems", err);
      }
    }

    getProblems();
    console.log(problems);
    // // @ts-ignore
    // const subscription = API.graphql(graphqlOperation(onUpdateProblem)).subscribe({
    //   next: (res: SubscriptionValue<OnCreateTodoSubscription>) => {
    //     const problems = mapOnCreateTodoSubscription(res.value.data);
    //     console.log(todo);
    //     setProblems([...todos, todo]);
    //   },
    // });
    // const subscription = API.graphql(
    //   graphqlOperation(onUpdateProblem)
    // ).subscribe({
    //   next: (res: ) => {
    //     console.log("data: ", data);
    //   },
    // });
    // return () => subscription.unsubscribe();
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {problems.map((problem) => {
          console.log(problem);
          return (
            <Grid item key={problem.id} xs={12} md={6}>
              <Card className={classes.problem}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.cardHeader} title="Problem Title">
                    <Typography gutterBottom variant="h5" component="h2">
                      {problem.title}
                    </Typography>
                    <Avatar className={classes.easy}>E</Avatar>
                  </div>
                  <div className={classes.cardCenter}>
                    <div>
                      <Typography variant="overline" display="block">
                        {problem.url}
                      </Typography>
                      <Typography variant="overline" display="block">
                        {problem.timestamp}
                      </Typography>
                      <Typography variant="overline" display="block">
                        {problem.duration}
                      </Typography>
                    </div>
                    <div>
                      <div className={classes.chips}>
                        {problem.algorithms.map((algo, i) => {
                          return (
                            <Chip label={algo} key={i} color="secondary" />
                          );
                        })}
                      </div>
                      <div className={classes.chips}>
                        {problem.dataStructures.map((ds, i) => {
                          return <Chip label={ds} key={i} />;
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
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/form")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default History;
