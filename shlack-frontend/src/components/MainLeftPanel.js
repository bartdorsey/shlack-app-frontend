import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid } from "@material-ui/core";
import { useSelector } from 'react-redux';
import ChannelList from './ChannelList';


const useStyles = makeStyles((theme) => ({
  sidePanel: {
    background: "#303E4D",
    width: "20vw",
    height: "100vh",
  },
  panelHeader: {
    borderTop: "thin solid #45515f",
    borderBottom: "thin solid #45515f",
    height: "5em"
  }
}));

const MainLeftPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidePanel} >
      <Grid container direction="row" justify="center" alignItems="center" className={classes.panelHeader}>
        <Typography variant="h6" color="primary" fontWeight="700" >Shlack</Typography>
      </Grid>
      <Grid container>
        <ChannelList />
      </Grid>
    </div>
  );
};

export default MainLeftPanel;
