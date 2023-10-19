import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularIndeterminate from "components/Progress/CircularIndeterminate";
import CarDetailComponent from "./CarDetailComponent";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { apiBaseUrl } from 'config';

const defaultTheme = createTheme();

const CarDetailLoading = () => {
    const { id } = useParams();
    useEffect(() => {
        getCarInfo();
    }, []);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);

    const getCarInfo = async () => {
        const url = `${apiBaseUrl}/car-info/inspec?id=${id}`;
        const json = await (
            await fetch(url,{
                method: "GET"
            })
        ).json();
        console.log("in car detail ",json.data);
        setData(json.data);
        setLoading(false);
    };

    return (
        (loading) ? (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        < CircularIndeterminate />
                    </Box>
                </Container>
            </ThemeProvider>
             ) : ( < CarDetailComponent jsonData={data} setJsonData={setData} /> )
    );
};

export default CarDetailLoading;