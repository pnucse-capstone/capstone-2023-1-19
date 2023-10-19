import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import baner from 'assets/images/cloudchain.png';
import dayjs from 'dayjs';
import { apiBaseUrl } from 'config';
// import jsonData from '../../assets/data.json';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="#6439ff" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
//style={{color: '#6439ff'}} 
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Album() {
    const navigate = useNavigate();
    const [txData, setTxData] = useState([]);
    const [ixData, setIxData] = useState([]);
    const [txAsync, setTxAsync] = useState(false);
    const [ixAsync, setIxAsync] = useState(false);
    const [mergeData, setMergeData] = useState([]);

    useEffect(() => {
      if (txAsync && ixAsync) {
        matchData();
      }
    }, [txAsync, ixAsync]);

    useEffect(() => {
      getCarTxList();
      getCarIxList();
    }, []);

    const getCarTxList = async () => {
      // console.log(localStorage.getItem('Authorization'));
      const url = `${apiBaseUrl}/contract/get-contract`;
      const json = await (
        await fetch(url, {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
          },
            body: JSON.stringify({
              filter: true,
              priceFilter: false,
              mileageFilter: false,
              model: '',
              status: 'SellerRequest', //'BuyerRequest',
              assignor: '',
              periodRangeStart: dayjs().subtract(1, "y").format('YYYY-MM-DD'),
              periodRangeEnd: dayjs().format('YYYY-MM-DD'),
              priceRangeStart: '',
              priceRangeEnd: '',
              mileageRangeStart: '',
              mileageRangeEnd: '',
            })
          })
        ).json();
      console.log("tx data  ",json);
      if (json !== null && json.result == 'SUCCESS') {
        setTxData(json.data);
        setTxAsync(true);
        // alert("로그인");
      } else {
        // alert("로그인 실패");
      }
    };

    const getCarIxList = async () => {
      const url = `${apiBaseUrl}/car-info/inspec-all`;
      const json = await (
        await fetch(url, {
          method: "GET"
          })
        ).json();
      console.log("ix data  ",json);
      if (json !== null && json.result == 'SUCCESS') {
        setIxData(json.data);
        setIxAsync(true);
        // alert("로그인");
      } else {
        // alert("로그인 실패");
      }
    };

    const matchData = () => {
      const mergedData = txData.map(item1 => {
        const matchingItemInData2 = ixData.find(item2 => item2.id === item1.id);
        if (matchingItemInData2) {
          return { ...item1, ...matchingItemInData2 };
        } else {
          return item1; // data2에 해당 id를 가진 항목이 없는 경우
        }
      });
      console.log("merge data  ", mergedData);
      setMergeData(mergedData);
    };

    const handleSellerClick = () => {
      navigate('/');
    };
    const handleCarClick = () => {
      navigate("/buy");
    };

    const nav = (id) => {
      // const id = id;
      console.log(id);
      navigate(`/buy/${id}`);
    };
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <AppBar position="relative" style={{backgroundColor: '#6439ff'}} >
        <Toolbar>
          <DirectionsCarIcon sx={{ mr: 2 }} />
          <CarCrashIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Cloud Chain 중고차 거래 시스템
          </Typography>
        </Toolbar>
      </AppBar> */}
      <img src={baner} style={{width:"1100px"}} alt="Cloudchain main baner"  />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {/* <Grid item xs={12} sm={6} style={{ textAlign: 'center', padding: '16px' }}>
              <img src={baner} alt="Car back"  />
            </Grid> */}
            {/* <Grid item xs={12} sm={6} style={{ textAlign: 'center', padding: '16px' }}>
              <Button variant="contained" onClick={handleCarClick} size="large" style={{ backgroundColor: '#6439ff' }} endIcon={<SendIcon />}>
                차량 조회하기
              </Button>
            </Grid> */}
            {mergeData.map((rowData, index) => (
              <Grid item key={rowData.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image= { 
                        (rowData.images !== undefined) ? (
                            (rowData.images.outside === "")? "https://source.unsplash.com/random?wallpapers"
                            : rowData.images.outside 
                          ) : ("https://source.unsplash.com/random?wallpapers")
                        } //"https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {rowData.model}
                    </Typography>
                    <Typography>
                      판매자 : {rowData.seller}
                    </Typography>
                    <Typography>
                      가격 : {rowData.price}
                    </Typography>
                    <Typography>
                      KM : {rowData.mileage}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => nav(rowData.id)} size="small">View</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Album;