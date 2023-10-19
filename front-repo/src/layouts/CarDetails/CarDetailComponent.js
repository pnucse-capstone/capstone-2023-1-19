import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button, Card, CardContent, Typography} from '@mui/material';
import SlickSlider from './SlickSlider';
import Avatar from '@mui/material/Avatar';
import BuyTransactionTemplate from "./BuyTransactionTemplate";
import ReportTemplate from "./ReportTemplate";
import CarDetailTemplate from "./CarDetailTemplate";
import { apiBaseUrl } from 'config';
import {toast} from 'react-toastify'

const CarDetailComponent = ({jsonData, setJsonData}) => {
  const [detailData, setDetailData] = useState([]);
  const [images, setImages] = useState(jsonData.images);
  const [pairData, setPairData] = useState([]);
  useEffect(() => {
    setDetailData(jsonData);
    setImages(jsonData.images);
    console.log("get Detail data  ", detailData);
    console.log("Get detail images data  ", images)
  }, [jsonData]);

  useEffect(() => {
    if (detailData !== null) {
      const jsonObjectData = JSON.parse(localStorage.getItem("carTransactionData"));
      console.log("Check for localstorage json data  ", jsonObjectData);
      const flattenedData = flattenObject(jsonObjectData);
      setPairStrings(flattenedData);
      getProfileImage(jsonObjectData.seller);
    }
    // console.log("get Detail data  ", detailData);
    // console.log("Get detail images data  ", images)
  }, [detailData]);

  const [data, setData] = useState(JSON.parse(localStorage.getItem("carTransactionData")));
  const [sellerProfileImg, setSellerProfileImg] = useState("https://pnu-studyhub.s3.ap-northeast-2.amazonaws.com/2023-10-12_defaultUserImg");
  const [open, setOpen] = useState(false);
  const [sellerReportOpen, setSellerReportOpen] = useState(false);
  const [carReportOpen, setCarReportOpen] = useState(false);
  const [carDetailOpen, setCarDetailOpen] = useState(false);
  
  const handleOpen = () => {
    const org = localStorage.getItem('Org');
    if (org !== 'buyer') {
      toast.error("구매자 회원만 차량을 판매할 수 있습니다.")
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCarDetailOpen = () => {
    setCarDetailOpen(true);
  };
  const handleCarDetailClose = () => {
    setCarDetailOpen(false);
  };

  const handleSellerReportOpen = () => {
    setSellerReportOpen(true);
  };
  const handleSellerReportClose = () => {
    setSellerReportOpen(false);
  };
  const handleCarReportOpen = () => {
    setCarReportOpen(true);
  };
  const handleCarReportClose = () => {
    setCarReportOpen(false);
  };

  async function getProfileImage(userName)  {
    console.log("판매자 프로필 조회 시작");
    const token = localStorage.getItem('Authorization');
    const url = `${apiBaseUrl}/auth/get-profile-name/?username=${userName}`;
    if (userName != undefined && token != undefined) {
      console.log("판매자 프로필 조회 요청");
      await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          }
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then((responseData) => {
          if (responseData.result === 'SUCCESS') {
              console.log('판매자 프로필 조회 성공:', responseData);
              setSellerProfileImg(responseData.data.profileImage);
          } else {
              throw new Error('판매자 프로필 조회 실패.');
          }
      })
      .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
      });
    } else {
      console.log("undefined error");
    }

  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };


  const flattenObject = (obj, prefix = '') => {
    if (obj === undefined || obj === null) {
      return {};
    }
    return Object.keys(obj).reduce((acc, key) => {
      const propKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        return { ...acc, ...flattenObject(value, propKey) };
      } else {
        return { ...acc, [propKey]: value };
      }
    }, {});
  };

  const labelMap = {
    'id': 'ID',
    'period': '업로드 날짜',
    'seller': '판매자 이름',
    'assignor.residentRegistrationNumber': '판매자 주민등록번호',
    'phoneNumber': '판매자 전화번호',
    'address': '판매자 주소',
    'transactionState': '판매 상태',
    'residentRegistrationNumber': '차량 등록번호',
    'model': '차량 모델명',
    'vehicleIdentificationNumber': '차량 식별번호',
    'price': '거래 금액',
    'mileage': '주행거리',
  };

  const subheadingStyles = {
    fontWeight: 'bold',
    marginTop: '16px',
  };

  const setPairStrings = (paramData) => {
    const pairStrings = Object.entries(paramData).map(([key, value]) => {
      const modifiedKey = labelMap[key] || key;
      return `${modifiedKey}: ${value}`;
    });
    setPairData(pairStrings);
  };

  return (
    <div style={containerStyles}>
      <h1>차량 판매 정보</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={12} style={{ padding: '16px' }}>
          <SlickSlider carImages={images} setCarImages={setImages} />
        </Grid>
        <Grid item xs={12} sm={3} style={{ padding: '16px' }}>
          <Box sx={{ maxWidth: '100%', margin: '0 auto', border: '2px solid', borderRadius: '10px', height:'100%', borderColor:'grey.300' }}>
            <Card style={{height:'100%'}}>
              <CardContent style={{padding:'16px 0px'}}>
                <Avatar sx={{width:250, height:250}} alt="Seller's Profile Image" src={sellerProfileImg} />
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9} style={{ padding: '16px' }}>
          <Box sx={{ maxWidth: '100%', margin: '0 auto', border: '2px solid', borderRadius: '10px', height:'100%', borderColor:'grey.300' }}>
            <Card style={{height:'100%'}}>
              <CardContent>
                <Typography variant="h6" sx={subheadingStyles}>
                  판매자 정보
                  <Button variant="contained" color="primary" size="middle" style={{ marginLeft:'20px'}} onClick={handleSellerReportOpen}>신고하기</Button>
                </Typography>
                <ReportTemplate type={"판매자"} reportOpen={sellerReportOpen} handleReportClose={handleSellerReportClose}/>
                {pairData.slice(0, 5).map((pairString, index) => {
                  const [key, value] = pairString.split(': ');
                  return (
                    <Typography key={index} sx={{ marginTop: '8px' }}>
                      <span style={{ color: 'grey', fontWeight: 'bold' }}>{key}</span>: <span>{value}</span>
                    </Typography>
                  )
                })}
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ padding: '16px' }}>
          <Box sx={{
            margin: '0 auto',
            border: '2px solid',
            borderRadius: '10px',
            borderColor:'grey.300',
          }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={subheadingStyles}>
                  차량 상세 정보
                  <Button variant="contained" color="primary" size="middle" style={{ marginLeft:'20px'}} onClick={handleCarDetailOpen}>상세 정보 보기</Button>
                  <Button variant="contained" color="primary" size="middle" style={{ marginLeft:'20px'}} onClick={handleCarReportOpen}>신고하기</Button>
                </Typography>
                <CarDetailTemplate detailData={detailData} setDetailData={setDetailData} detailOpen={carDetailOpen} handleDetailClose={handleCarDetailClose}/>
                <ReportTemplate type={"차량"} reportOpen={carReportOpen} handleReportClose={handleCarReportClose}/>
                {pairData.slice(5).map((pairString, index) => {
                  const [key, value] = pairString.split(': ');
                  return (
                    <Typography key={index} sx={{ marginTop: '8px' }}>
                      <span style={{ color: 'grey', fontWeight: 'bold' }}>{key}</span>: <span>{value}</span>
                    </Typography>
                  )
                })}
                <Button variant="contained" color="primary" size="large" fullWidth style={{marginTop:'16px'}} onClick={handleOpen}>거래하기</Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <BuyTransactionTemplate open={open} handleClose={handleClose} jsonData={jsonData}/>
    </div>
  );
};

export default CarDetailComponent;
