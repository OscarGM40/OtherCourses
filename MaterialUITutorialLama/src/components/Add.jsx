import React from 'react';
import {
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { useState } from "react";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  container: {
    width: "80vw",
    height: "90vh",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "80vh",
    },
  },
  form: {
    padding: theme.spacing(2),

  },
  item: {
    marginBottom: theme.spacing(3),
  }
}));

const Add = () => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const classes = useStyles();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal open={open}      >
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.item}>
              <TextField label="Title" size="small" style={{ width: "100%" }} />
            </div>
            <div className={classes.item}>
              <TextField
                label="Description"
                defaultValue=""
                multiline
                rows={4}
                size="small"
                variant="outlined"
                style={{ width: "100%" }}
                />
            </div>
            <div className={classes.item}>
              <TextField select label="Visibility" value="Public">
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Unlisted">Unlisted</MenuItem>
              </TextField>
            </div>
            <div className={classes.item}>
              <FormLabel component="legend">Who can comment?</FormLabel>
              <RadioGroup>
                <FormControlLabel
                  value="Everybody"
                  control={<Radio size="small" />}
                  label="Everybody"
                  />
                <FormControlLabel
                  value="My Friends"
                  control={<Radio size="small" />}
                  label="My Friends"
                  />
                <FormControlLabel
                  value="Nobody"
                  control={<Radio size="small" />}
                  label="Nobody"
                  />
                <FormControlLabel
                  value="custom"
                  disabled
                  control={<Radio size="small" />}
                  label="Custom(Premium Accounts)"
                  />
              </RadioGroup>
            </div>
            <Button
              variant="outlined"
              color="primary"
               style={{ marginRight: 20 }}
               onClick={ () => setOpenSnack(true)}
              >
              Create
            </Button>
            <Button variant="outlined" color="secondary"
            onClick={ () => setOpen(false) }>
              Cancel
            </Button>
          </form>
        </Container>
      </Modal>
      <Snackbar open={openSnack} autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
       onClose={handleClose}>
         <Alert onClose={handleClose} severity="success">
           This is a success message!  
         </Alert>
      </Snackbar>
    </>
  );
};

export default Add;
