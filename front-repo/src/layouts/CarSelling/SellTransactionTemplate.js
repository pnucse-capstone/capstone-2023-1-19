import React, { useState } from 'react';
import { Button, Modal, Box, FormControl, TextField,Stack,Grid, MenuItem  } from '@mui/material';
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import { apiBaseUrl } from 'config';
import {toast} from 'react-toastify'

const SellTransactionTemplate = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [assignor, setAssignor] = useState({
    name: localStorage.getItem('UserName'),
    residentRegistrationNumber: '',
    phoneNumber: '',
    address: '',
  });

  const [transactionDetails, setTransactionDetails] = useState({
    transactionState: 'SellerRequest',
    vehicleRegistrationNumber: '',
    newVehicleRegistrationNumber: '',
    vehicleModelName: '',
    vehicleIdentificationNumber: '',
    transactionDate: '',
    transactionAmount: '',
    balancePaymentDate: '',
    vehicleDeliveryDate: '',
    vehicleDeliveryAddress:'',
    mileage: 0,
  });
  const [vehicleBasicInfo, setVehicleBasicInfo] = useState({
    vehicleIdentificationNumber: '',
    vehicleModelName: '',
    vehicleRegistrationNumber: '',
    gearboxType: '',
    fuelUsed: '',
    mileage: 0,
    color : "",
    options: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const apiUrl = `${apiBaseUrl}/car-info/inspec`;
    const headers = {
        Authorization: localStorage.getItem('Authorization'),
        'Content-Type': 'application/json',
    };

    fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id:0,
          vehicleBasicInfo:vehicleBasicInfo,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((responseData) => {
        if (responseData.result === 'SUCCESS') {
            console.log('POST 요청 성공:', responseData);
            return fetch(`${apiBaseUrl}/car-info/car`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ 
                  id: 3,
                  assignor: assignor,
                  transactionDetails: transactionDetails
                }),
            });
        } else {
            throw new Error('POST 요청이 실패했습니다.');
        }
    })
    .then((secondResponse) => {
        if (!secondResponse.ok) {
            throw new Error('두 번째 요청이 실패했습니다.');
        }
        return secondResponse.json();
    })
    .then((secondResponseData) => {
        console.log('두 번째 POST 요청 성공:', secondResponseData);
        // 여기에서 두 번째 응답에 따른 추가적인 로직을 수행할 수 있습니다.
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        toast.error("잘못된 인증서로 인해 차량 판매가 불가능합니다.")
    })
    .finally(() => {
        setLoading(false);
        handleClose();
    });
};

  const handleAssignorChange = (field, value) => {
    setAssignor((prevAssignor) => ({
      ...prevAssignor,
      [field]: value,
    }));
  };

  const handleTransactionDetailsChange = (field, value) => {
    setTransactionDetails((prevTransactionDetails) => ({
      ...prevTransactionDetails,
      [field]: value,
    }));
  };
  const handleVehicleBasicInfoChange = (field, value) => {
    setVehicleBasicInfo((prevVehicleBasicInfo) => ({
      ...prevVehicleBasicInfo,
      [field]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)', // Adjusted boxShadow for a more three-dimensional look
          width: '90vh', // Adjust the width as needed
          maxHeight: '90vh', // Adjust the max height as needed
          overflowY: 'auto',
        }}
      >
        <h2 id="modal-title">판매 명세서</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="transparent"
            >
              <CircularIndeterminate />
            </Box>
          )}
          {/* Assignor Fields */}
          <Box marginBottom={2}>
            <h3 style={{margin:'0px'}}>판매자 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="이름"
                    value={localStorage.getItem('UserName')}
                    disabled
                    // onChange={(e) => handleAssignorChange('name', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="주민등록번호"
                    value={assignor.residentRegistrationNumber}
                    onChange={(e) =>
                      handleAssignorChange('residentRegistrationNumber', e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="연락처"
                value={assignor.phoneNumber}
                onChange={(e) => handleAssignorChange('phoneNumber', e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="주소"
                value={assignor.address}
                onChange={(e) => handleAssignorChange('address', e.target.value)}
              />
            </FormControl>
          </Box>
          {/* Transaction Details Fields */}
          <Box marginBottom={2}>
            <h3 style={{margin:'0px'}}>차량 판매 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="차량 번호"
                    value={transactionDetails.vehicleRegistrationNumber}
                    onChange={(e) =>{
                        handleTransactionDetailsChange('vehicleRegistrationNumber', e.target.value)
                        handleVehicleBasicInfoChange('vehicleRegistrationNumber', e.target.value)
                      }
                    }
                  />
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="모델명"
                    value={transactionDetails.vehicleModelName}
                    onChange={(e) =>{
                        handleTransactionDetailsChange('vehicleModelName', e.target.value)
                        handleVehicleBasicInfoChange('vehicleModelName', e.target.value)
                      }
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                  <TextField
                    label="차량 식별 번호"
                    value={transactionDetails.vehicleIdentificationNumber}
                    onChange={(e) => {
                        handleTransactionDetailsChange('vehicleIdentificationNumber', e.target.value)
                        handleVehicleBasicInfoChange('vehicleIdentificationNumber', e.target.value)
                      }
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="주행거리"
                    value={transactionDetails.mileage}
                    onChange={(e) =>{
                        handleTransactionDetailsChange('mileage', e.target.value)
                        handleVehicleBasicInfoChange('mileage', e.target.value)
                      }
                    }
                  />
               </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="판매 금액"
                value={transactionDetails.transactionAmount}
                onChange={(e) =>
                  handleTransactionDetailsChange('transactionAmount', e.target.value)
                }
              />
            </FormControl>
          </Box>
          <Box marginBottom={2}>
          <h3>차량 검수 정보</h3>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="기어 종류"
                    select
                    value={vehicleBasicInfo.gearboxType}
                    onChange={(e) => handleVehicleBasicInfoChange('gearboxType', e.target.value)}
                  >
                    <MenuItem value="manual">수동 기어</MenuItem>
                    <MenuItem value="automatic">자동 기어</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="사용 연료 종류"
                    select
                    value={vehicleBasicInfo.fuelUsed}
                    onChange={(e) => handleVehicleBasicInfoChange('fuelUsed', e.target.value)}
                  >
                    <MenuItem value="gasoline">휘발유</MenuItem>
                    <MenuItem value="diesel">경유</MenuItem>
                    <MenuItem value="lpg">LPG</MenuItem>
                    <MenuItem value="cng">천연가스</MenuItem>
                    <MenuItem value="electric">전기</MenuItem>
                    <MenuItem value="hydrogen">수소</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="색상"
                    value={vehicleBasicInfo.color}
                    onChange={(e) =>
                      handleVehicleBasicInfoChange('color', e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
          </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="부가 옵션"
                value={vehicleBasicInfo.options}
                onChange={(e) => handleVehicleBasicInfoChange('options', e.target.value)}
              />
            </FormControl>
          </Box>          
          <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
            <Button type="submit" variant="contained" color="success" style={{width: 150}}>
              요청
            </Button>
            <Button onClick={handleClose} style={{width: 150, border: '1px solid'}} >닫기</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default SellTransactionTemplate;
