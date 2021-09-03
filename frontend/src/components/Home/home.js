import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Typography, Container, Grid } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import { Skeleton } from "@material-ui/lab";
require("es6-promise").polyfill();
require("isomorphic-fetch");


const Home = () => {

    const [tweet, setTweet] = useState([]);
    const [loading, setLoading] = useState(true)
    let history = useHistory();

    function getTweet() {
        console.log(1);
        api.getTweet()
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

    return (

        
                <Container maxWidth="lg">
                    <Button variant="outlined" style={{ width: 120, marginBottom: 12 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
                    {
                        (tweet.length > 0) ? tweet.map((row, index) =>
                        <Link to={{ pathname: `/Profile/${row.userid}`, state: { userid: row.userid, email: row.email } }} key={index} style={{ textDecoration: 'none' }} >
                            <Box mb={1} key={index}>
                                <Card className={classes.root} variant="outlined">
                                    <CardHeader
                                        title={
                                            <Typography variant="overline" component="div">
                                                <Box fontWeight={520} fontSize="h6.fontSize">
                                                    {row.email} - {row.message}
                                                </Box>
                                            </Typography>
                                        }
                                    />
                                    <CardContent>
                                        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                                <Typography variant="overline" component="div">
                                                    <Box fontWeight={500} fontSize="body1.fontSize">
                                                        lowerlimit : {row.strikelowerprice}$
                                                </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                                <Typography variant="overline" component="div">
                                                    <Box fontWeight={500} fontSize="body1.fontSize">
                                                        upperlimit : {row.strikeupperprice}$
                                                </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                                <Typography variant="overline" component="div">
                                                    <Box fontWeight={500} fontSize="body1.fontSize">
                                                        mailTo : {row.email}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                                <Typography variant="subtitle2" component="div" align="right" style={{ marginTop: 15 }}>
                                                    <Box fontWeight={500} fontSize="subtitle2.fontSize">
                                                        Created at {new Date(row.date).toUTCString()}
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
                                        You have not added any trigger...
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>}
                </Container>

    );
};

export default Home;