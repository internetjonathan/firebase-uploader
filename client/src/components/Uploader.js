import React, { useState } from 'react'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios'

export default function Uploader(props) {
    const [state, setState] = useState({
        title: "",
        category: "",
        file: ""
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleUpload = (e) => {
        setState(prevState => ({
            ...prevState,
            file: e.target.files[0]
        }))
    }


    const handImageUpload = (e) => {

        e.preventDefault();
        const formData = new FormData()
        formData.append("title", state.title)
        formData.append("category", state.category)
        formData.append("file", state.file)

        setLoading(true)

        axios.post('/post', formData)
            .then(res => {
                console.log('success')
                setLoading(false)
                props.handleClose()
                window.location.reload();

            })
            .catch(err => {
                setErrors(err.response.data)
                setLoading(false)
            })
    }

    const loadingBtn = loading ? (<div style={{ textAlign: "center", marginTop: 15 }}><CircularProgress /></div>) :
        (<Button
            style={{ width: "100%", marginTop: 15 }}
            color="primary"
            variant="contained"
            type="submit"
            className="btn btn-primary"
            onClick={handImageUpload}
        >
            Upload
        </Button>)

    return (

        <form noValidate onSubmit={handImageUpload}>
            <TextField style={{ display: "flex" }} id="title" name="title" type="text" value={state.title} onChange={handleChange} label="Title" helperText={errors.email} error={errors.email ? true : false}>
            </TextField>
            <FormControl style={{ display: 'flex' }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="category"
                    value={state.category}
                    name='category'
                    onChange={handleChange}
                >
                    <MenuItem value={'priceLists/wholesale'}>Price Lists/Wholesale</MenuItem>
                    <MenuItem value={'priceLists/contractor'}>Price Lists/Contractor</MenuItem>
                    <MenuItem value={'priceLists/manufacturer'}>Price Lists/Manufacturer</MenuItem>
                    <MenuItem value={'catalogs/european'}>Catalogs/European</MenuItem>
                    <MenuItem value={'catalogs/durarods'}>Catalogs/Durarods</MenuItem>
                    <MenuItem value={'specs'}>Specs</MenuItem>
                    <MenuItem value={'pointOfSale'}>Point of Sale</MenuItem>
                    <MenuItem value={'misc'}>Misc</MenuItem>

                </Select>
            </FormControl>
            <FormControl style={{ display: 'flex', marginTop: 15 }}>
                <input type='file' onChange={handleUpload} id='imageInput' />
                {errors.general && (
                    <Typography variant="body2" >
                        {errors.general}
                    </Typography>
                )}
            </FormControl>
            {loadingBtn}
        </form>
    )
}
