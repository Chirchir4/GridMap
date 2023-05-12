import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (props.showAccessiblity) {
      setOpen(true);
    }
  }, [props.showAccessiblity]);

  const handleClose = () => {
    props.toggleAccessiblity()
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.showAccessiblity}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{ background: "#8a2be2" }} sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Accessibility
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <h1>Map Options</h1>
          <hr></hr>
          <div style={{ width: "60%" }}>
            {
              props.darkMode?  <button
              id="logout"
              type="button"
              className="button-active-large"
              onClick={() => {props.toggleDarkMode()}}
            >
              Turn on Light Mode
            </button>:<button
              id="logout"
              type="button"
              className="button-active-large"
              onClick={() => {props.toggleDarkMode()}}
            >
              Turn on Dark Mode
            </button>
            }
            
          
          </div>
        </Grid>
      </Dialog>
    </div>
  );
}
