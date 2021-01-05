import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { DataStore } from "aws-amplify";
import { Problem } from "../../models";

import { ListItem } from "./ListItem";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    // paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(18),
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // },
  },
  fab: {
    bottom: 70,
    right: 40,
    margin: 0,
    top: "auto",
    left: "auto",
    position: "fixed",
  },
}));

async function listProblems(
  setProblems: React.Dispatch<React.SetStateAction<Problem[]>>
) {
  try {
    const problems = await DataStore.query(Problem);
    setProblems(problems);
    console.log("Queried list of problems:", problems);
  } catch (err) {
    console.log("Error retrieving problems", err);
  }
}

async function changeSync() {
  await DataStore.clear();
  await DataStore.start();
}

const List: React.FC<{ user: any }> = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [problems, setProblems] = React.useState<Problem[]>([]);

  React.useEffect(() => {
    listProblems(setProblems);

    const subscription = DataStore.observe(Problem).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      listProblems(setProblems);
    });

    return () => subscription.unsubscribe();
  }, []);
  // React.useEffect(() => {
  //   const subscription = DataStore.observe(Problem).subscribe((msg) => {
  //     console.log(msg.model, msg.opType, msg.element);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // React.useEffect(() => {
  //   async function getProblems() {
  //     try {
  //       const theItems = await DataStore.query(Problem);
  //       setProblems(theItems);
  //       console.log("Posts retrieved successfully.", theItems);
  //     } catch (err) {
  //       console.log("Error retrieving problems", err);
  //     }
  //   }

  //   getProblems();
  // }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {problems.map((data) => {
          return <ListItem data={data} key={data.id} user={user} />;
        })}
      </Grid>
      {user && (
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => history.push("/form")}
        >
          <AddIcon />
        </Fab>
      )}
    </Container>
  );
};

export default List;
