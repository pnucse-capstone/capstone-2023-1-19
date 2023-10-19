import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, FormControl, TextField,Stack,Grid} from '@mui/material';
import {apiBaseUrl } from 'config';
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider, DesktopDatePicker, TextFieldProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const CompromiseTemplate = ({ open, handleClose, row, setRow, change, setChange }) => {
  const [loading, setLoading] = useState(false); // Add this state
  const [editable, setEditable] = useState(false);

  const handleButtonClick = (buttonType) => {
    if(buttonType == "accept") {
      row = {
        ...row,
        transactionDetails: {
          ...row.transactionDetails,
          transactionState: "Accept",
        },
      };
    } 
    setLoading(true); 
    console.log(row)
    const apiUrl = `${apiBaseUrl}/contract/compromise`;
    const headers = {
      Authorization: localStorage.getItem('Authorization'),
      'Content-Type': 'application/json',
    };
    fetch(apiUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(row),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('PATCH 요청 성공:', responseData);
        setChange(!change);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false); 
        handleClose(); 
      });
  };
  useEffect(() => {
    console.log(row);
  }, [row]);
  
  const handleTransactionDetailsChange = (value) => {  
    console.log(value.field)
    if (value.field == 'vehicleDeliveryDate') {
      value.value = value.value.format('YYYY-MM-DD')
    } 
    console.log(value.field)
    console.log(value.value)
    setRow((prevRow) => ({
      ...prevRow,
      transactionDetails: {
        ...prevRow.transactionDetails,
        [value.field]: value.value,
      },
    }));
    console.log(row)
  };
  const handleToggleEdit = () => {
    setEditable((prevEditable) => !prevEditable);
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
        <h2 id="modal-title">거래 조정 관리</h2>
        <hr/>
        <form>
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
          <Box marginBottom={2}>
            <h3 style={{margin:'0px'}}>거래 조정 정보</h3>
            <FormControlLabel
              control={<Switch checked={editable} onChange={handleToggleEdit} />}
              label="편집 "
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="차량 식별번호"
                    value={row.transactionDetails.vehicleIdentificationNumber}
                    onChange={(e) =>
                      handleTransactionDetailsChange({
                        field: 'vehicleIdentificationNumber',
                        value: e.target.value,
                      })}
                      InputProps={{
                        readOnly: !editable,
                      }}
                  />
                  
                  </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                <TextField
                    label="차량 모델명"
                    value={row.transactionDetails.vehicleModelName}
                    onChange={(e) =>
                      handleTransactionDetailsChange({
                        field: 'vehicleModelName',
                        value: e.target.value,
                      })}
                      InputProps={{
                        readOnly: !editable,
                      }}
                  />
                </FormControl>
              </Grid>
            </Grid>  
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label = "차량 번호"
                    value={row.transactionDetails.vehicleRegistrationNumber}
                    onChange={(e) =>
                      handleTransactionDetailsChange({
                        field: 'vehicleRegistrationNumber',
                        value: e.target.value,
                      })}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="변경할 차량 번호"
                    value={row.transactionDetails.newVehicleRegistrationNumber}
                    onChange={(e) =>
                      handleTransactionDetailsChange({
                        field: 'newVehicleRegistrationNumber',
                        value: e.target.value,
                      })}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="주행 거리"
                    value={row.transactionDetails.mileage}
                    onChange={(e) =>
                      handleTransactionDetailsChange({
                        field: 'mileage',
                        value: e.target.value,
                      })}
                    InputProps={{
                      readOnly: !editable,
                    }}  
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="가격"
                    value={row.transactionDetails.transactionAmount}
                    onChange={(e) =>
                      handleTransactionDetailsChange({
                        field: 'transactionAmount',
                        value: e.target.value,
                      })}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="지불 일자"
                      value={dayjs(row.transactionDetails.balancePaymentDate)}
                      onChange={(newValue) =>
                        handleTransactionDetailsChange({
                          field: 'balancePaymentDate',
                          value: newValue,
                        })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    >
                      {({ inputRef, inputProps }: TextFieldProps) => (
                        <TextField
                          {...inputProps}
                          inputRef={inputRef}
                          fullWidth
                          InputProps={{
                            readOnly: !editable,
                          }}
                        />
                      )}
                    </DesktopDatePicker>
                  </LocalizationProvider>
                  </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="차량 인도 일자"
                    value={dayjs(row.transactionDetails.vehicleDeliveryDate)}
                    onChange={(newValue) =>
                      handleTransactionDetailsChange({
                        field: 'vehicleDeliveryDate',
                        value: newValue,
                      })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  >
                    {({ inputRef, inputProps }: TextFieldProps) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        fullWidth
                        InputProps={{
                          readOnly: !editable,
                        }}
                      />
                    )}
                  </DesktopDatePicker>
                </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="차량 인도 위치"
                value={row.transactionDetails.vehicleDeliveryAddress}
                onChange={(e) =>
                  handleTransactionDetailsChange({
                    field: 'vehicleDeliveryAddress',
                    value: e.target.value,
                  })}
                InputProps={{
                  readOnly: !editable,
                }}
              />
            </FormControl>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
            <Button type="button" onClick={() => handleButtonClick("accept")} variant="contained" 
            style={{ 
              backgroundColor: (() => {
                if (editable) {
                  return '#D3D3D3';
                } else {
                  return '#b3e0ff'; 
                }
              })(),
              flex: 1, color: '#000' }} 
            
            disabled={editable} >
              조정 수락
            </Button>
            <Button type="button" onClick={() => handleButtonClick("request")} variant="contained" style={{ flex: 1, backgroundColor: '#FFD54F', color: '#000' }}>
              조정 재요청
            </Button>
            <Button onClick={handleClose} style={{ flex: 1, border: '1px solid' }}>
              닫기
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CompromiseTemplate;
