import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'

export default function Home(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/posts'
            );
            setData(result.data);
            console.log(result.data)
        };
        fetchData();
    }, []);

    let recentPosts = data ? (data.filter(item => item.category === props.category).map(item =>
        <Grid item md={2} sm={4} xs={6} key={item.postId}>
            <Card style={{ textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h6" component="h5">
                        {item.title}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" component="h5">
                        <DescriptionIcon style={{ fontSize: 60, textAlign: 'center' }} />
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button>
                        <a href="mailto:miami.dionne@gmail.com"><EmailIcon /></a>
                    </Button>
                    <Button>
                        <a target="_blank" rel='noreferrer' href={item.imgUrl} download><GetAppIcon /></a>
                    </Button>
                </CardActions>
            </Card>

        </Grid>))
        :
        <Grid item sm={1} xs={12} style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <CircularProgress />
        </Grid>

    return (
        <Grid container spacing={1}>
            {recentPosts}
        </Grid>
    )
}
