import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button,Card, CardContent, Typography} from '@mui/material';
import jsonData from '../../assets/data.json';
import SlickSlider from './SlickSlider';
import BuyTransactionTemplate from "./BuyTransactionTemplate";



const CarDetailComponent = () => {
  const { id } = useParams();
  const [data, setData] = useState(jsonData[id]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const tempData = {
    id: 1,
    uploadDate: "2023-06-28 08:11:17",
    assignor: {
      name: "John",
      residentRegistrationNumber: "1234567890",
      phoneNumber: '123-456-7890',
      address: 'Seoul'
    },
    transactionDetails: {
      transactionState: "Selling",
      vehicleRegistrationNumber: "1234",
      vehicleModelName: "Tesla Model S",
      vehicleIdentificationNumber: "5YJ3E1EA1JF00001",
      transactionAmount: 1000,
      mileage: 10000
    }
  };

  const flattenObject = (obj, prefix = '') => {
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

  const flattenedData = flattenObject(tempData);

  const labelMap = {
    'id': 'ID',
    'uploadDate': '업로드 날짜',
    'assignor.name': '판매자 이름',
    'assignor.residentRegistrationNumber': '판매자 주민등록번호',
    'assignor.phoneNumber': '판매자 전화번호',
    'assignor.address': '판매자 주소',
    'transactionDetails.transactionState': '판매 상태',
    'transactionDetails.vehicleRegistrationNumber': '차량 등록번호',
    'transactionDetails.vehicleModelName': '차량 모델명',
    'transactionDetails.vehicleIdentificationNumber': '차량 식별번호',
    'transactionDetails.transactionAmount': '거래 금액',
    'transactionDetails.mileage': '주행거리',
  };

  const subheadingStyles = {
    fontWeight: 'bold',
    marginTop: '16px',
  };

  const pairStrings = Object.entries(flattenedData).map(([key, value]) => {
    const modifiedKey = labelMap[key] || key;
    return `${modifiedKey}: ${value}`;
  });

  return (
    <div style={containerStyles}>
      <h1>차량 판매 정보</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} style={{ padding: '16px' }}>
          <SlickSlider />
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: '16px' }}>
          <Box sx={{ maxWidth: '100%', margin: '0 auto', border: '2px solid', borderRadius: '10px', height:'100%', borderColor:'grey.300' }}>
            <Card style={{height:'100%'}}>
              <CardContent>
                <Typography variant="h6" sx={subheadingStyles}>판매자 정보</Typography>
                {pairStrings.slice(0, 5).map((pairString, index) => {
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
                <Typography variant="h6" sx={subheadingStyles}>차량 상세 정보</Typography>
                {pairStrings.slice(5).map((pairString, index) => {
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
      <BuyTransactionTemplate open={open} handleClose={handleClose}/>
    </div>
  );
};

export default CarDetailComponent;
