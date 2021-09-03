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
  const [iserror, setIserror] = useState(false);
  let params = useParams();
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  const [email, setEmail] = useState("");
  const [followingList,setFollowingList]=useState([]);
  const [curUser,setCurUser]=useState("");
  const [dble,setDble]=useState(false);
  const [followers,setFollowers]=useState();
    const [following,setFollowing]=useState();

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

//   function checkDisable(s)
//   {
//       console.log(s);
//     if(followingList.includes(s))
//     {
//         setDisable(true);
//     }
//     else
//     {
//         console.log("hi");
//         setDisable(false);
//     }
//   }

//   function getData(s)
//   {
//     api.getUser(s)
//     .then((data) => {
//         console.log(data.data);
//         setUser(data.data);
//     })
//   }


  useEffect(() => {
    const s = params.userid;
    console.log(s);
    // getUser(s)
    api.getUser(s)
    .then((data) => {
        console.log(data.data);
        setUser(data.data);
        setFollowers(data.data.followers.length);
        setFollowing(data.data.following.length);
    })
    

    
    // var user2=user;
    // setEmail(user2.email);

    // var email3=user.email;
    //const n = location.state;
    // var user2= await api.getUser(s);
    // console.log(user);
    setUserIdOfFollower(JSON.parse(localStorage.getItem('profile')).result.userid);
    setEmail2(s);
    // console.log(JSON.parse(localStorage.getItem('profile')).result.userid);

    api.getUser(JSON.parse(localStorage.getItem('profile')).result.userid)
    .then((data)=>{
        console.log(data.data.following);
        setCurUser(data.data);
        setFollowingList(data.data.following);
        // checkDisable(s);
        if(data.data.following.includes(params.userid))
        {
            setDble(true);
        }
        else
        {
            console.log("hi");
            // console.log(params.userid);
            setDble(false);
        }
        
    })

    // setTimeout(checkDisable(s),500);


    // setFollowingList(curUser.following)
    // .then((data)=>{
    //     console.log(data);
    // });


    
    // console.log(followingList);
    // .then((date)=> {

    // })
    // api.getFollowingList()
    // .then((data)=>{
    //     console.log(data.data);
    //     setFollowingList(data.data);
    // })
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


  const handleSubmit = (e) => {
    e.preventDefault();

    var followData = { userId:user.userid, personId :userIdOfFollower };
    console.log(followingList);
    api.addFollow(followData)
    .then(data => {
    console.log(data);
    // setLowerlimit(0);
    // setUpperlimit(0);
    history.push('/');
    })
    .catch(err => console.log(err));
    }

  return (

    <Container maxWidth="lg">
      <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>


        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <br />
          <hr /><br />
          <Typography variant="h6">
              {/* {
                  userEmail
              } */}
            User ID: {user.userid}
                </Typography>
          <br /><hr />
          Email Address : <Typography variant="h6">
            {user.email}
                </Typography>
          <hr /><br />
          <Typography variant="h6">
                                
                                Followers {followers}
                        </Typography>
                
                        <Typography variant="h6">
                                
                                Following {following}
                        </Typography>
          {!dble?<Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 250 }}> Follow </Button>:
          <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 250 }}> UnFollow </Button>}
        </form>
    </Container>
  );
};

export default Profile;