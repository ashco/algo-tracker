import React from "react";

import { useForm, Controller } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    width: "100%",
  },
  chips: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

type Algorithm =
  | "Pointer"
  | "Runner"
  | "Binary Search"
  | "DFS"
  | "BFS"
  | "Quick Sort"
  | "Merge Sort"
  | "Recursion"
  | "DP"
  | "Greedy";

type DataStructures =
  | "Array"
  | "String"
  | "Linked List"
  | "Stack"
  | "Queue"
  | "Hash Table"
  | "Binary Tree"
  | "Binary Search Tree"
  | "Trie"
  | "Heap"
  | "Graph";

interface FormValues {
  title: string;
  url: string;
  difficulty: Difficulty | "";
  duration: number;
  date: any;
  algorithms: Algorithm[];
  dataStructures: DataStructures[];
  notes: string;
  replUrl: string;
}

const defaultValues: FormValues = {
  title: "",
  url: "",
  difficulty: "",
  duration: 0,
  date: new Date("2014-08-18T21:11:54"),
  algorithms: [],
  dataStructures: [],
  notes: "",
  replUrl: "",
};

const algorithms = [
  "Pointer",
  "Runner",
  "Binary Search",
  "DFS",
  "BFS",
  "Quick Sort",
  "Merge Sort",
  "Recursion",
  "DP",
  "Greedy",
];
const dataStructures = [
  "Array",
  "String",
  "Linked List",
  "Stack",
  "Queue",
  "Hash Table",
  "Binary Tree",
  "Binary Search Tree",
  "Trie",
  "Heap",
  "Graph",
];

export default function AddressForm() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
  } = useForm<FormValues>({ defaultValues });
  // console.log(watch()); // watch input value by passing the name of it
  // const [difficulty, setDifficulty] = React.useState("");

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setDifficulty(event.target.value as string);
  // };

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Container className={classes.cardGrid} maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          New Problem
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Problem Title"
                fullWidth
                inputRef={register}
                // variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="url"
                name="url"
                label="Problem URL"
                fullWidth
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="difficulty-select">Difficulty</InputLabel>
                <Controller
                  control={control}
                  name="difficulty"
                  as={
                    <Select id="difficulty-select">
                      <MenuItem value="EASY">Easy</MenuItem>
                      <MenuItem value="MEDIUM">Medium</MenuItem>
                      <MenuItem value="HARD">Hard</MenuItem>
                    </Select>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="duration"
                name="duration"
                label="Duration"
                fullWidth
                type="number"
                inputRef={register}
                // variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Controller
                control={control}
                name="date"
                as={
                  <KeyboardDatePicker
                    margin="normal"
                    label="Date picker"
                    format="MM/dd/yyyy"
                    // value={selectedDate}
                    // onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                }
              /> */}
            </Grid>
            <div className={classes.chips}>
              {algorithms.map((algo) => {
                return <Chip label={algo} clickable color="default" />;
              })}
            </div>
            <div className={classes.chips}>
              {dataStructures.map((ds) => {
                return <Chip label={ds} clickable color="default" />;
              })}
            </div>
            <Grid item xs={12}>
              <TextField
                id="notes"
                name="notes"
                label="Notes"
                fullWidth
                inputRef={register}
                multiline
                rows={4}
                // variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="replUrl"
                name="replUrl"
                label="REPL URL"
                fullWidth
                inputRef={register}
                // variant="outlined"
              />
            </Grid>

            <div className={classes.buttons}>
              <Button color="primary" variant="contained" disableElevation>
                Start
              </Button>
              <Button color="primary" variant="outlined">
                Complete
              </Button>
              <Button>Cancel</Button>
            </div>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
