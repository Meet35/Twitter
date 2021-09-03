import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Typography, Container, Grid , TextField } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import { Skeleton } from "@material-ui/lab";
require("es6-promise").polyfill();
require("isomorphic-fetch");


const Home = () => {

    const [tweet, setTweet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [list,setList] = useState([])
    const [userId,setUserId]=useState("");
    let history = useHistory();

    function getTweet() {
        console.log(1);
        var userid1=JSON.parse(localStorage.getItem('profile')).result.userid;
        console.log(userid1);
        api.getTweet(userid1)
            .then(data => {
                console.log(data.data);

                setTweet(data.data);
                // setList(data.data);
                // setLoading(false);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        setLoading(true);
        getTweet();
        getList();
    }, []);

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            backgroundColor: "#f2f2f2"
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
        date: {
            marginRight: 3,
            align: `right`,
        },
        gcontainer: {
            paddingLeft: "30px",
            paddingRight: "10px"
        },
        errcon: {
            align: 'center',
        },
        extrapadding: {
            paddingLeft: "30px",
            paddingRight: "10px",
            minHeight: 200,
        },
    });

    const classes = useStyles();


    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }

    const goToTweet = async (e) => {
        e.preventDefault();
        history.push(`/tweet`);
    }

    async function getList() {
        try {
            const { data } = await api.getUsers();
            console.log(data);
            setList(data);
            // whynotcount = data;
            // eslint-disable-next-line eqeqeq
            // if (whynotcount.length == 5) {
            //     setDisable(true);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userId);
        // await getList();
        history.push(`/profile/${userId}`);
    };

    return (

        
                <Container maxWidth="lg">
                    <form onSubmit={handleSubmit}>
                            <Grid container spacing={4} justify="center" alignItems="center">
                                <Grid item xs>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={list}
                                        getOptionLabel={(option) => option.userid + " - " + option.name}
                                        getOptionSelected={(option, value) => option.userid === value.userid}
                                        style={{ width: 600 }}
                                        autoComplete
                                        value={userId}
                                        onChange={(event, newValue) => {
                                            setUserId(newValue.userid);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="search users" variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Box display="flex" justifyContent="space-between">
                                        <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 260 }}>Visit Profile</Button>
                                        {/* <Button variant="contained" onClick={showTriggers} color="secondary" size="large" style={{ width: 260 }}>Show all Triggers</Button> */}
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    <Button variant="contained" onClick={goToTweet} color="secondary" size="large" style={{ width: 260 }}>Tweet Here</Button>
                    {
                        (tweet.length > 0) ? tweet.map((row, index) =>
                        <Link to={{ pathname: `/Profile/${row.userid}`, state: { userid: row.userid, email: row.email } }} key={index} style={{ textDecoration: 'none' }} >
                            <Box mb={1} key={index}>
                                <Card className={classes.root} variant="outlined">
                                    <CardHeader
                                        title={
                                            <Typography variant="overline" component="div">
                                                <Box fontWeight={520} fontSize="h6.fontSize">
                                                    {row.email}
                                                </Box>
                                            </Typography>
                                        }
                                    />
                                    <CardContent>
                                        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                                <Typography variant="overline" component="div">
                                                    <Box fontWeight={500} fontSize="body1.fontSize">
                                                        {row.message}
                                                </Box>
                                                </Typography>
                                            </Grid>
                                            
                                            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                                <Typography variant="subtitle2" component="div" align="right" style={{ marginTop: 15 }}>
                                                    <Box fontWeight={500} fontSize="subtitle2.fontSize">
                                                        Tweeted at {new Date(row.date).toUTCString()}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Link>
                        ) : <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">

                            <Grid item xs={12} sm={12} md={12} className={classes.extrapadding}>
                                <Typography variant="overline" component="div" align='center'>
                                    <Box fontWeight={550} fontSize="h5.fontSize" marginTop={8}>
                                        Follow your friends to see tweets...
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>}
                </Container>

    );
};

export default Home;