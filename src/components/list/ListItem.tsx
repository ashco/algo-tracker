import React from "react";
import { useHistory } from "react-router-dom";

import { DataStore } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { green, orange, red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { Difficulty, Problem } from "../../models";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import { formatChipText } from "../../lib/helpers";

import { formatDistanceToNow } from "date-fns";

const useStyles = makeStyles((theme) => ({
  data: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(1),
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
    display: "flex",
    justifyContent: "space-between",
  },
  cardActionsLeft: {
    display: "flex",
    gap: theme.spacing(1),
    // "& > *": {
    //   margin: theme.spacing(0, 4),
    // },
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
  modal: {
    position: "absolute",
    width: 360,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 4, 2),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalActions: {
    justifyContent: "center",
  },
}));

// const ModalBody: React.FC<{ id: string; handleClose: () => void }> = ({
//   id,
//   handleClose,
// }) => {
const ModalBody = React.forwardRef(
  ({ id, handleClose }: { id: string; handleClose: () => void }, ref) => {
    const classes = useStyles();

    async function handleDelete(id: string) {
      try {
        const toDelete = await DataStore.query(Problem, id);
        if (toDelete) {
          await DataStore.delete(toDelete);
          console.log("Problem deleted!");
          handleClose();
        } else {
          throw new Error("Unable to find problem to delete.");
        }
      } catch (err) {
        console.log("Error during deletion:", err);
      }
    }

    return (
      <div className={classes.modal}>
        <h2 id="simple-modal-title">Delete Problem?</h2>
        <p id="simple-modal-description">
          Do you really want to delete all your hard work?
        </p>
        <CardActions className={classes.modalActions}>
          <Button size="medium" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => handleDelete(id)}
            disableElevation
          >
            Delete
          </Button>
        </CardActions>
      </div>
    );
  }
);

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

export const ListItem: React.FC<{ data: Problem; user: any }> = ({
  data,
  user,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const modalRef = React.useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
                {/* <Typography variant="overline" display="block">
                {data.url}
              </Typography> */}
                <Typography variant="overline" display="block">
                  {formatDistanceToNow(data.timestamp)} ago
                </Typography>
                <Typography variant="overline" display="block">
                  {data.duration} minutes
                </Typography>
              </div>
              <div className={classes.chipGroup}>
                <div className={classes.chips}>
                  {data.algorithms.map((algo, i) => {
                    return (
                      <Chip
                        label={formatChipText(algo)}
                        key={i}
                        color="primary"
                      />
                    );
                  })}
                </div>
                <div className={classes.chips}>
                  {data.dataStructures.map((ds, i) => {
                    return (
                      <Chip
                        label={formatChipText(ds)}
                        key={i}
                        color="secondary"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <div className={classes.cardActionsLeft}>
              <Button
                // size="small"
                variant="contained"
                color="primary"
                disableElevation
              >
                View
              </Button>
              {user && (
                <Button
                  // size="small"
                  // color="primary"
                  onClick={() => history.push(`/form/${data.id}`)}
                >
                  Edit
                </Button>
              )}
            </div>
            <div>
              {user && (
                <IconButton
                  aria-label="delete"
                  // size="small"
                  // onClick={() => handleDelete(data.id)}
                  onClick={handleOpen}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </CardActions>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalBody id={data.id} handleClose={handleClose} ref={modalRef} />
      </Modal>
    </>
  );
};
