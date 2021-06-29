import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import CircularProgress from '@material-ui/core/CircularProgress';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios'
import { IconButton } from '@material-ui/core';

export default function Home(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/posts'
            );
            setData(result.data);
        };
        fetchData();
    }, []);
    axios.defaults.headers.delete['Authorization'] = localStorage.getItem('FBtoken')
    axios.defaults.headers.post['Authorization'] = localStorage.getItem('FBtoken')


    const deletePost = (postId) => {
        axios.delete(`/post/${postId}`)
            .then(res => {
                const index = data.findIndex(post => post.postId === postId)
                const newArr = [...data]
                newArr.splice(index, 1)
                setData(newArr)

            })
            .catch(err => {
                console.log(err)
            })
    }
    let location

    if (props.location.state === undefined) {
        location = 'priceList'
    } else {
        location = props.location.state.category
    }

    let recentPosts = data ? (data.filter(item => item.category === location).map(item =>
        <Grid item md={2} sm={4} xs={6} key={item.postId}>
            <Card style={{ textAlign: 'center' }}>
                <CardContent>
                    <Typography style={{ textAlign: 'right', padding: 0 }}>
                        <IconButton color="secondary" onClick={() => deletePost(item.postId)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="h6" component="h5" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', }} >
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
                        <a href={`mailto:?subject=${item.title}&body=${item.imageUrl}`}><EmailIcon /></a>
                    </Button>
                    <Button>
                        <a target="_blank" rel='noreferrer' href={item.imageUrl} download><GetAppIcon /></a>
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
