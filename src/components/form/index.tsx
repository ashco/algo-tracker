import React from "react";

import { useForm, Controller, useController } from "react-hook-form";
import ReactSelect from "react-select";

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
import Checkbox from "@material-ui/core/Checkbox";

import { Difficulty, Algorithm, DataStructure } from "../../models";

import { DataStore } from "aws-amplify";
import { Problem } from "../../models";
import { CreateProblemInput } from "../../API";

import { EnumReflection } from "../../lib/EnumReflection";

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

// interface FormValues {
//   title: string;
//   url: string;
//   difficulty: Difficulty | "";
//   duration: number;
//   date: any;
//   algorithms: Algorithm[];
//   dataStructures: DataStructure[];
//   notes: string;
//   replUrl: string;
// }

const defaultValues: CreateProblemInput = {
  title: "",
  url: "https://leetcode.com/",
  difficulty: Difficulty.EASY,
  duration: "34",
  timestamp: new Date().getTime(),
  algorithms: [],
  dataStructures: [],
  notes: "",
  replUrl: "",
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
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
// const algorithms: Algorithm[] = EnumReflection.getNames(Algorithm);
// console.log(algorithms);
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

// function MultiSelect(props: any) {
//   const { field, meta } = useController(props);
//   // console.log(field);
//   // field.onChange = (val) => [val];
//   return (
//     <div>
//       {algorithms.map((algo, i) => {
//         return <Chip label={algo} key={i} clickable {...field} />;
//       })}
//       {/* <input {...field} placeholder={props.name} />
//       <p>{meta.isTouched && "Touched"}</p>
//       <p>{meta.isDirty && "Dirty"}</p>
//       <p>{meta.invalid ? "invalid" : "valid"}</p> */}
//     </div>
//   );
// }

export default function AddressForm() {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    getValues,
    setValue,
  } = useForm<CreateProblemInput>({ defaultValues });
  const classes = useStyles();

  const formAlgos = getValues("algorithms");

  const onSubmit = async (data: CreateProblemInput) => {
    // DataStore.clear();
    try {
      await DataStore.save(new Problem(data));
      console.log("Post saved!");
    } catch (err) {
      console.log("Error saving post", err);
    }
  };

  console.log({ ...watch() });
  // console.log(formAlgos);
  // I've done dynamic RN forms stuff but have not used useFieldArray.
  // I have wrapped all of my field types in <Controller>s.
  // And so far the only "array type" I have needed has been for multi-selects, that I was able to handle simply by setting the value of a single <Controller> to the array output (having the Controller's onChange being called for each selection made in the multi-select control, and .push()ing the value

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
                // variant="outlined"
                fullWidth
                type="number"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="algorithms"
                control={control}
                render={({ onChange, onBlur, value, name, ref }) => {
                  return (
                    <div className={classes.chips}>
                      {algorithms.map((algo, i) => {
                        return (
                          <Chip
                            key={i}
                            clickable
                            label={algo}
                            color={value.includes(algo) ? "primary" : "default"}
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
              <Button color="primary" variant="contained" type="submit">
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
