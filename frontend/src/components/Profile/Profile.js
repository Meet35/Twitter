import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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



const Profile = () => {

  const [email2, setEmail2] = useState()
  const [userIdOfFollower,setUserIdOfFollower] = useState()
  const [user,setUser]=useState([])
  const [similarstck, setSimilarstck] = useState([]);
  const [ohlc, setOhlc] = useState([]);
  const [candlepricedata, setCandlepricedata] = useState([]);
  const [candlevolumedata, setCandlevolumedata] = useState([]);
  const [juststock, setJuststock] = useState([]);
  const [volume, setVolume] = useState([]);
  const [iserror, setIserror] = useState(false);
  let params = useParams();
  var chartComponent = useRef(null);
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  const [currentprice, setCurrentprice] = useState(0.00);
  const [upperlimit, setUpperlimit] = useState(0.00);
  const [lowerlimit, setLowerlimit] = useState(0.00);
  const [isuppererror, setIsuppererror] = useState(false);
  const [islowererror, setIslowererror] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /*
  const handleChangeIndex = (index) => {
    setValue(index);
  };*/


//   function getUser(s) {
//     console.log(1);
//     api.getUser(s)
//         .then(data => {
//             console.log(data.data);
//             setUser(data.data);
//             // console.log(user);
//             // setEmail(data.email);
//             // console.log(email);
//             // setTweet(data.data);
//             // setList(data.data);
//             // setLoading(false);
//         })
//         .catch(err => console.log(err));
// }


  useEffect(() => {
    const s = params.userid;
    console.log(s);
    // getUser(s)
    api.getUser(s)
    .then((data) => {
        console.log(data.data);
        setUser(data.data);
    })
    // var user2=user;
    // setEmail(user2.email);

    // var email3=user.email;
    //const n = location.state;
    // var user2= await api.getUser(s);
    console.log(user);
    setUserIdOfFollower(JSON.parse(localStorage.getItem('profile')).result.userid);
    setEmail2(s);
    // console.log(s);
    // console.log(JSON.parse(localStorage.getItem('profile')).result.userid);
    },[]);

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

  function gotoStock(item, e) {
    e.preventDefault();
    history.push(`/view/${item}`);
    window.location.reload();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to add triigger',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            var followData = { userId:user.userid, personId :userIdOfFollower };
            api.addFollow(followData)
              .then(data => {
                console.log(data);
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
            // setLowerlimit(0);
            // setUpperlimit(0);
          }
        }
      ]
    });

  };

  return (

    <Container maxWidth="lg">
      <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>


        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <br />
          <hr /><br />
          <Typography variant="h4">
              {/* {
                  userEmail
              } */}
            User ID: {user.userid}
                </Typography>
          <br /><hr />
          Email Address : <Typography variant="h4">
            {user.email}
                </Typography>
          <hr /><br />
          <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 250 }}> Follow </Button>
        </form>
    </Container>
  );
};

export default Profile;