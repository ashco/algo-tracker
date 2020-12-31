import React from "react";

import { useForm, Controller, useController } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import { Difficulty, Algorithm, DataStructure } from "../../models";

import { DataStore } from "aws-amplify";
import { Problem } from "../../models";
import { CreateProblemInput } from "../../API";

import { EnumReflection } from "../../lib/EnumReflection";

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
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
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
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(10),
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
  // tags: {
  //   padding: theme.spacing(0, 1),
  //   // paddingBottom: 0,
  // },
}));

const defaultValues: CreateProblemInput = {
  title: "",
  url: "",
  difficulty: Difficulty.EASY,
  duration: "0",
  timestamp: new Date().getTime(),
  algorithms: [],
  dataStructures: [],
  notes: "",
  replUrl: "",
};
// const defaultValues: CreateProblemInput = {
//   title: "",
//   url: "https://leetcode.com/",
//   difficulty: Difficulty.EASY,
//   duration: "34",
//   timestamp: new Date().getTime(),
//   algorithms: [],
//   dataStructures: [],
//   notes: "",
//   replUrl: "",
// };

// const defaultValues: CreateProblemInput = {
//   title: "THE ONE WITH THE TAGS",
//   url: "https://leetcode.com/",
//   replUrl: "",
//   notes: "",
//   difficulty: Difficulty.EASY,
//   duration: "43",
//   timestamp: 1609361576984,
//   // time: "12:30:24-07:00",
//   // date: "2014-08-18",
//   algorithms: [Algorithm.POINTERS, Algorithm.QUICK_SORT],
//   dataStructures: [DataStructure.ARRAY, DataStructure.QUEUE],
// };

// const algorithms = [
//   "Pointer",
//   "Runner",
//   "Binary Search",
//   "DFS",
//   "BFS",
//   "Quick Sort",
//   "Merge Sort",
//   "Recursion",
//   "DP",
//   "Greedy",
// ];

// const dataStructures = [
//   "Array",
//   "String",
//   "Linked List",
//   "Stack",
//   "Queue",
//   "Hash Table",
//   "Binary Tree",
//   "Binary Search Tree",
//   "Trie",
//   "Heap",
//   "Graph",
// ];

const algorithms = [
  Algorithm.DYNAMIC_PROGRAMMING,
  Algorithm.POINTERS,
  Algorithm.BINARY_SEARCH,
  Algorithm.DFS,
  Algorithm.BFS,
  Algorithm.QUICK_SORT,
  Algorithm.MERGE_SORT,
  Algorithm.RECURSION,
  Algorithm.GREEDY_METHOD,
];

const dataStructures = [
  DataStructure.ARRAY,
  DataStructure.BINARY_SEARCH_TREE,
  DataStructure.BINARY_TREE,
  DataStructure.GRAPH,
  DataStructure.HASH_TABLE,
  DataStructure.HEAP,
  DataStructure.LINKED_LIST,
  DataStructure.QUEUE,
  DataStructure.STACK,
  DataStructure.STRING,
  DataStructure.TRIE,
];

type Params = {
  id?: string;
};

enum Status {
  NEW,
  EDIT,
}

export default function AddressForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
  } = useForm<CreateProblemInput>({ defaultValues });
  const classes = useStyles();
  const history = useHistory();
  const params: Params = useParams();
  const [status, setStatus] = React.useState<Status>(Status.NEW);

  const onSubmit = async (data: CreateProblemInput) => {
    try {
      if (status === Status.EDIT) {
        const id = params?.id;
        if (id) {
          const original = await DataStore.query(Problem, id);

          if (original) {
            console.log("Updating original");
            // return history.push("/list");
            // await DataStore.save(
            //   Problem.copyOf(original, (updated) => {
            //     // console.log(original);
            //     for (let key of Object.keys(original)) {
            //       // // @ts-ignore
            //       // updated[key] = data[key];
            //     }
            //     // console.log(updated);
            //     // updated.title = `title ${Date.now()}`;
            //   })
            // );
            return;
            // await DataStore.save(
            // );
          }
        }
      }

      await DataStore.save(new Problem(data));
      history.push("/list");

      // let problem = new Problem(data);

      // if (status === Status.EDIT) {
      //   const id = params?.id;
      //   if (id) {
      //     problem = await DataStore.query(Problem, id);
      //   }
      // }

      // const problem = status === Status.NEW
      //   ? new Problem(data)
      //   : Post.copyOf(original, (updated) => updated.title = `title ${Date.now()}`)

      console.log("Post saved!");
    } catch (err) {
      console.log("Error saving post", err);
    }
  };

  // console.log({ ...watch() });

  React.useEffect(() => {
    async function loadFormData(params: Params) {
      const id = params?.id;

      if (id) {
        console.log("loading data");
        const data = await DataStore.query(Problem, id);
        reset(data);
        setStatus(Status.EDIT);
      }
    }

    loadFormData(params);
  }, [params]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl} required>
                  <InputLabel htmlFor="difficulty-select">
                    Difficulty
                  </InputLabel>
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
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="duration"
                  name="duration"
                  label="Mins to Complete"
                  // variant="outlined"
                  fullWidth
                  type="number"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="timestamp"
                  control={control}
                  render={({ value, onChange }) => {
                    return (
                      <DateTimePicker
                        label="Completed At"
                        required
                        showTodayButton
                        format="yyyy/MM/dd HH:mm"
                        value={value}
                        onChange={(date) => {
                          onChange(date?.getTime());
                        }}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel shrink>Algorithms</InputLabel>
                <Controller
                  name="algorithms"
                  control={control}
                  render={({ onChange, onBlur, value, name, ref }) => {
                    return (
                      <>
                        <div className={classes.chips}>
                          {algorithms.map((algo, i) => {
                            return (
                              <Chip
                                key={i}
                                clickable
                                label={algo}
                                color={
                                  value.includes(algo) ? "primary" : "default"
                                }
                                onClick={() => {
                                  const newValue = [...value];
                                  const idx = newValue.indexOf(algo);
                                  if (idx === -1) {
                                    newValue.push(algo);
                                  } else {
                                    newValue.splice(idx, 1);
                                  }
                                  onChange(newValue);
                                }}
                              />
                            );
                          })}
                        </div>
                      </>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel shrink>Data Structures</InputLabel>
                <Controller
                  name="dataStructures"
                  control={control}
                  render={({ onChange, onBlur, value, name, ref }) => {
                    return (
                      <div className={classes.chips}>
                        {dataStructures.map((ds, i) => {
                          return (
                            <Chip
                              key={i}
                              clickable
                              label={ds}
                              color={
                                value.includes(ds) ? "secondary" : "default"
                              }
                              onClick={() => {
                                const newValue = [...value];
                                const idx = newValue.indexOf(ds);
                                if (idx === -1) {
                                  newValue.push(ds);
                                } else {
                                  newValue.splice(idx, 1);
                                }
                                onChange(newValue);
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  }}
                />
              </Grid>
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
                {/* <Button color="primary" variant="outlined" disableElevation>
                Start
              </Button> */}
                <Button onClick={() => history.push("/list")}>Cancel</Button>
                <Button color="primary" variant="contained" type="submit">
                  {status === Status.NEW ? "Complete" : "Update"}
                </Button>
              </div>
            </Grid>
          </form>
        </Paper>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
