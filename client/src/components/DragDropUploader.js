import React, { useState } from 'react'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import MenuItem from '@material-ui/core/MenuItem';
import { useDropzone } from "react-dropzone"
import axios from 'axios'

export default function DragDropUploader(props) {
    const [state, setState] = useState({
        title: "",
        category: "",
        file: ""
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
            handImageUpload(acceptedFiles)

        }
    })
    // console.log(files[0].name)
    const handleChange = (e) => {

        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: "200px" }} alt="preview" />
            </div>
        </div>
    ))

    const handImageUpload = (files) => {
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData()
            formData.append("title", files[i].name)
            formData.append("category", state.category)
            formData.append("file", files[i])

            setLoading(true)

            axios.post('/post', formData)
                .then(res => {
                    console.log('success')
                    if (i === files.length - 1) {
                        props.handleClose()
                        window.location.reload();
                    }
                })
                .catch(err => {
                    setErrors(err.response.data)
                    setLoading(false)
                })
        }

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

        <form noValidate>
            <FormControl required style={{ display: 'flex' }}>
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
            <FormControl style={{ display: 'flex' }}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h2 style={{
                        height: 100,
                        border: 'dotted',
                        borderColor: 'grey',
                        textAlign: 'center',
                        paddingTop: 31
                    }}>Drop files here</h2>
                </div>
                <div>
                    {loading === true &&
                        <div style={{ textAlign: "center", marginTop: 15 }}><CircularProgress /></div>
                    }
                </div>
            </FormControl>
        </form>
    )
}
