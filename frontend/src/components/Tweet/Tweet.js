import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import Helmet from 'react-helmet';
//import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import * as api from '../../api/index.js';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
require("es6-promise").polyfill();
require("isomorphic-fetch");
const Tweet = () => {

  const [user, setUser] = useState([])
  let params = useParams();
  var chartComponent = useRef(null);
  let history = useHistory();
  const [message1, setMessage1] = useState("");
  const [email, setEmail] = useState("");


  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundcolor: theme.palette.background.paper,
      padding: theme.spacing(3),
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 8,
    },
    button: {
      marginRight: 3,
      align: `right`,
    },
    avatar: {
      backgroundcolor: 'red',
    },
    rounded: {
      color: '#fff',
      backgroundColor: '#f0a',
      width: theme.spacing(30),
      height: theme.spacing(3),
    },
    itsTrue: {
      height: '670px',
    },
  }));

  const classes = useStyles();

  function handleClick(e) {
    e.preventDefault();
    history.push('/');
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message1);
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you want to tweet??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            var user2=JSON.parse(localStorage.getItem('profile')).result;
            setUser(user2);
            console.log(user2);
            var tweet = { email: user2.email, message:message1, userid:user2.userid };
            console.log(tweet);
            api.addTweet(tweet)
              .then(tweet => {
                console.log(tweet);
                // setLowerlimit(0);
                // setUpperlimit(0);
                history.push('/');
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: 'No',
          onClick: () => {
          }
        }
      ]
    });

  };

  return (

    <Container maxWidth="lg">
      <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          
          <hr /><br />
          Message : <TextField name="message" helperText="should be grater than current Price" onChange={e => { setMessage1(e.target.value);  }} autoFocus required />
          <br /><hr />
          <br />
          <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 250 }}> Add </Button>
        </form>
    </Container>
  );
};

export default Tweet;