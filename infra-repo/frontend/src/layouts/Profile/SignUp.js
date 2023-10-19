import React, { useState, useEffect, useRef, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignUp() {
  // const fileInput = React.useRef(null);
  const [file, setFile] = useState(null);

  const [submitDatas, setSubmitDatas] = useState({
    userid: '',
    email: '',
    password: '',
    name: '',
    org: 'buyer',
    detail: 'test',
    reg: ''
  });

  const [isSwitch, setIsSwitch] = useState(true);

  const handleSubmitChange = (event) => {
    setSubmitDatas((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log("name : ",event.target.name);
    console.log("value : ",event.target.value);
  };

  const hadleSwitchChage = (event) => {
    setIsSwitch((currentSwitch) => !currentSwitch);
    // console.log("after change ", isSwitch);
    { (isSwitch) ? setSubmitDatas({
        userid: submitDatas.userid,
        email: submitDatas.email,
        password: submitDatas.password,
        name: submitDatas.name,
        org: 'seller',
        detail: 'test',
        reg: ''
      }) : setSubmitDatas({
        userid: submitDatas.userid,
        email: submitDatas.email,
        password: submitDatas.password,
        name: submitDatas.name,
        org: 'buyer',
        detail: 'test',
        reg: ''
      })
    }
  };

  // const handleImageClick = (event) => {
  //   fileInput.current.click();
  //   // setIsChecked((currentCheck) => !currentCheck)
  //   // setIsSwitch((currentSwitch) => !currentSwitch)
  // };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      console.log("Check for image upload");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log({
      id: submitDatas.userid,//ddata.get('userid'),
      email: submitDatas.email,//ddata.get('email'),
      password: submitDatas.password,//ddata.get('password'),
      name: submitDatas.name,//ddata.get('name'),
      org: submitDatas.org,//data.get('org'),
      reg: submitDatas.reg
    });
    console.log("test   " , submitDatas);
    getSignUp(submitDatas.org);
  };

  // const getSignUp = async () => {

  //   const url = 'http://localhost:8000/sign-up/'+submitDatas.org;
  //   const json = await (
  //       await fetch(url, {
  //         method: "POST",
  //         headers: {
  //           'Content-type': 'application/json'
  //       },
  //         body: JSON.stringify({
  //           userid: submitDatas.userid,
  //           name: submitDatas.name,
  //           email: submitDatas.email,
  //           password: submitDatas.password,
  //           org: submitDatas.org,
  //           businessRegistrationRequest: submitDatas.reg,
  //           detail: 'test'
  //         })
  //       })
  //     ).json();
  //     console.log(json);
  // };

  const getSignUp = async (orgType) => {
      // if (!file) return;
      console.log("Test for param orgType  - ", orgType);
      const url = 'http://localhost:8000/sign-up/'+submitDatas.org;
      const formData = new FormData();

      await formData.append('dto', new Blob([JSON.stringify({
                  userid: submitDatas.userid,
                  name: submitDatas.name,
                  email: submitDatas.email,
                  password: submitDatas.password,
                  org: submitDatas.org,
                  detail: 'test'
                })], {type: 'application/json'}) );
      if (orgType == 'seller') {
        console.log("check image");
        await formData.append('image', file);
      }

      const json = await (
        await fetch(url, {
          method: "POST",
          // headers: {
          //   'Content-type': 'multipart/form-data'
          // },
            body: formData
          })
        ).json();

  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userid"
                  label="User ID"
                  name="userid"
                  onChange={handleSubmitChange}
                  autoComplete="userid"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleSubmitChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleSubmitChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={handleSubmitChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="p" color="inherit" align="justify" noWrap>
                  구매자 / 판매자
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Switch
                  checked={isSwitch}
                  onChange={hadleSwitchChage}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  id="org"
                  label="User Divide"
                  name="org"
                  disabled
                  value={isSwitch ? "buyer" : "seller"}
                />
              </Grid>
              {isSwitch ? null : (
              <Grid item xs={12}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="p" color="inherit" align="justify" noWrap>
                    사업자등록증
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Badge badgeContent={4} color="primary">
                    <MailIcon color="action" />
                  </Badge>
                </Grid>
                <Grid item xs={4}>
                  <input type="file" name="image" onChange={handleImageUpload} />
                  {/*  시도 1
                  <Button
                    onRowClick={handleImageClick}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    이미지 업로드
                  </Button>
                  <input type="file"
                    ref={fileInput}
                    onChange={handleImageUpload}
                    style={{ display: "none" }} /> 
                    */}

                </Grid>
              </Grid> )}

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;