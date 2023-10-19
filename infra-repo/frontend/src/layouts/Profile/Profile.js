import React, { useState, useEffect } from 'react';
import CircularIndeterminate from "./../../components/Progress/CircularIndeterminate";
import Mypage from "./Mypage";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const defaultTheme = createTheme();

function Profile() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const getProfile = async () => {
        const json = await (
            //await fetch(`https://localhost:8080/auth/get`)
            await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)     
        ).json();
        console.log(json);
        setProfile(json.data);
        setLoading(false);
    };
    useEffect(() => {
        getProfile();
    }, []);

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
             ) : ( < Mypage data={profile} /> )
        // (loading) ? ( <  Mypage data={profile} /> ) : ( < CircularIndeterminate /> )
    );
}

export default Profile;