import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Button, Box, Avatar, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Grid, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ChannelForm from './ChannelForm';
import { useDispatch } from 'react-redux';
import { getChannels, showForm, setCurrentChannel, createChannel } from '../store/actions/channel';
import { useEffect, useState } from 'react';
import { Route, useParams, Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
  panelHeader: {
    height: "3em",
    color: theme.typography.color,
    paddingLeft: "1em"
  },
  root: {
    width: '100%',
    maxWidth: 360,
  },
  channelDiv: {
    height: "5vh"
  },
  channelText: {
    color: "white",
    width: "17vw",
    height: "4vh"
  },
  addIcon: {
    color: "white"
  },
  navLink: {
    textDecoration: "none"
  },
  formContainer: {
    position: "absolute",
    background: theme.palette.primary.main,
    width: "25vw",
    height: "50vh",
    border: "thin solid black",
    color:"black",
    right: "35vw",
    bottom: "25vh",
    borderRadius: "5%"
  },
  formHeader: {
    color: "black",
    fontWeight: ""
  },
  formInputs: {
    paddingTop: "1.5em",
    paddingBottom: "1em"
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "#303E4D",
    color: theme.palette.primary.main
  },
}));

const ChannelList = () => {

  const dispatch = useDispatch();
  // const token = useSelector((state) => state.authentication.token);
  const formVisible = useSelector((state) => state.channel.formVisible);
  const channels = useSelector((state) => state.channel.channelList);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  const [channelFormDisplay, setChannelFormDisplay] = React.useState(false);

  const handleChannelTitleChange = e => setTitle(e.target.value)
  const handleChannelTopicChange = e => setTopic(e.target.value)

  const handleChannelForm = () => {
    setChannelFormDisplay(true);
  };
  const handleChannelFormClose = () => {
    setChannelFormDisplay(false);
  };
  const handleChannelCreate = () => {
    const payload = {
      title,
      topic,
    };
    dispatch(createChannel(payload));
    setChannelFormDisplay(false);
  }

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };


  const joinChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  }

  const classes = useStyles();
  if (!channels) {
    return null;
  }

  return (
    <Grid container>
      <Grid container direction="row" justify="space-between" alignItems="center" className={classes.panelHeader}>
        <Grid item>
          <Typography variant="subtitle1" >
            Channels
          </Typography>
        </Grid>
        <Grid item>
          <IconButton backgroundColor="white" onClick={handleChannelForm}>
            <AddIcon className={classes.addIcon}/>
          </IconButton>
          <Dialog open={channelFormDisplay} onClose={handleChannelFormClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Your Channel</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a Channel title and topic.
              </DialogContentText>
              <TextField
                error={title === ''}
                autoFocus
                margin="dense"
                id="channelName"
                label="Channel Name"
                type="text"
                fullWidth
                value={title}
                onChange={handleChannelTitleChange}
              />
              <TextField
                margin="dense"
                id="channelAvatar"
                label="Channel Topic"
                type="text"
                fullWidth
                value={topic}
                onChange={handleChannelTopicChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleChannelFormClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleChannelCreate} disabled={title === ''} color="secondary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <Grid container >
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {channels.map(channel => {
            return (
              <ListItem button key={channel.id} onClick={() => joinChannel(channel.id)} className={classes.channelDiv} >
                <Link to={`/channels/${channel.id}`} className={classes.navLink}>
                  <ListItemText className={classes.channelText} primary={`# ${channel.title}`} />
                  <Divider/>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default ChannelList;
