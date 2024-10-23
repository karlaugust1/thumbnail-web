import './Form.css'
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { LoadingButton } from '@mui/lab';

import Box from '@mui/material/Box';
import React, { useState } from 'react';
import CloudUpload from '@mui/icons-material/CloudUpload';
import axios from 'axios'

export default function Form(props) {
    const [file, setFile] = useState(null)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        name: {
            active: false,
            message: ''
        },
        file: {
            active: false,
            message: ''
        }
    })
    const [snack, setSnackData] = useState({
        active: false,
        message: ''
    });

    const { message, active } = snack

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = ['png'];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            setFile(file);
        } else {
            errors['file'].active = true;
            errors['file'].message = `Please select an image file (${allowedExtensions.join(',')}).`;
            setErrors(errors)
        }
    };

    const handleFileUpload = async () => {

        if (file) {
            try {
                setLoading(true)
                const { data: url } = await axios.post('http://localhost:8000/thumbnails/presigned-urls', { 
                    file_name: `${name}.png`
                })

                const headers = {
                    'Content-Type': file.type,
                }
                await axios.put(url, file, { headers });
                
                setSnackData({ active: true, message: "File upload successfully"})
                setFile(null)
                setName(``)
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                setLoading(false)
            }
        }
    };

    const validate = async () => {
        if (!name || !file) {
            setErrors({
                name: {
                    active: !name ,
                    message: !name && `Name must be filled.`
                },
                file: {
                    active: !file,
                    message: !file && `File must be filled.`
                }
            })
            return
        }

        handleFileUpload()
    };

    return (
        <Box className="fieldset">
            <TextField
                error={errors.name?.active}
                helperText={errors?.name?.message}
                id="name-field"
                label="Name"
                variant="filled"
                fullWidth
                margin="dense"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />

            <TextField
                error={errors['file'].active}
                helperText={errors['file'].message}
                id="file-field"
                type="file"
                variant="filled"
                fullWidth
                margin="dense"
                onChange={handleFileChange}
            />

            <LoadingButton
                color="secondary"
                onClick={validate}
                loading={loading}
                loadingPosition="end"
                endIcon={<CloudUpload />}
                variant="contained"
            >
                Submit
            </LoadingButton>

            <Snackbar
                anchorOrigin={{ vertical: `top`, horizontal: `center` }}
                open={active}
                autoHideDuration={3000}
                message={message}
            />
        </Box>
    );
}