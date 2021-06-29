import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import { Typography } from '@material-ui/core';





export default function Login() {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        setLoading(true)
        axios.post('/login', payload)
            .then(res => {
                localStorage.setItem("FBtoken", `Bearer ${res.data.token}`);
                window.location.href = '/';
            })
            .catch(err => {
                setErrors(err.response.data)
                setLoading(false)
            });
    }

    const loadingBtn = loading ? (<div style={{ textAlign: "center", marginTop: 15 }}><CircularProgress /></div>) : (<Button
        style={{ width: "100%", marginTop: 15 }}
        color="primary"
        variant="contained"
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}
    >
        Login
    </Button>)

    return (
        <Grid container>
            <Grid item sm></Grid>
            <Grid item sm>
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField style={{ display: "flex" }} id="email" name="email" type="email" label="Email" value={state.email} onChange={handleChange} helperText={errors.email} error={errors.email ? true : false}>
                    </TextField>
                    <TextField style={{ display: "flex" }} id="password" name="password" type="password" label="Password" value={state.password} onChange={handleChange} helperText={errors.password} error={errors.password ? true : false}></TextField>
                    {errors.general && (
                        <Typography variant="body2" >
                            {errors.general}
                        </Typography>
                    )}
                    {loadingBtn}
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
