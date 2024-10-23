import './List.css'

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { CardActions, CardMedia, Container, IconButton } from '@mui/material';

export default function List() {
    const [loading, setLoading] = useState(false)
    const [thumbnails, setThumbnails] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:8000/thumbnails')
            setThumbnails(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8000/thumbnails/${id}`)
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    const listItems = thumbnails.map(thumbnail =>
        <Card sx={{ width: 275 }} className='mb-16' key={thumbnail.id}>
            <CardContent>
                <CardMedia
                    component="img"
                    height="140"
                    image={thumbnail.thumbnail_url}
                />
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Name
                </Typography>
                <Typography variant="h6" component="div">
                    {thumbnail.file_name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Created at
                </Typography>
                <Typography variant="h6" component="div">
                    {thumbnail.created_at}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Original size
                </Typography>
                <Typography variant="h6" component="div">
                    {thumbnail.size ?? '0KB'}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Approx. reduced size
                </Typography>
                <Typography variant="h6" component="div">
                    {thumbnail.approx_reduced_size}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="delete" size="small" color="secondary"
                    onClick={ () => handleDelete(thumbnail.id) }
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );

    return (
        <Container sx={{ maxWidth: '100% !important', padding: '0px !important', margin: '0px !important' }}>
            <p>All your thumbnails: </p>
            <Container sx={{ height: '80vh', overflow: 'auto', maxWidth: '100% !important', display: 'flex', justifyContent: 'center' }}>
                {
                    loading ?
                        <CircularProgress /> :
                        <Box>
                            {listItems}
                        </Box>
                }
            </Container>
        </Container>
    );
}