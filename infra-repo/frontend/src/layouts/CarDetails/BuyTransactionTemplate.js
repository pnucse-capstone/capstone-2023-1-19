import React, { useState } from 'react';
import { Button, Modal, Box, FormControl, TextField, Stack, Grid, MenuItem } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const SellTransactionTemplate = ({ open, handleClose }) => {
  const [assignee, setAssignee] = useState({
    name: '',
    residentRegistrationNumber: '',
    phoneNumber: '',
    address: '',
  });

  const [transactionDetails, setTransactionDetails] = useState({
    newVehicleRegistrationNumber: '',
    balancePaymentDate: dayjs(),
    vehicleDeliveryDate: dayjs(),
    vehicleDeliveryAddress: '',

  });
  const [inspection, setInspection] = useState({
    inspectionOffice: '',
    inspectionDate: dayjs(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      assignee,
      transactionDetails,
      inspection,
    };
    console.log(data);
    // Reset state here if necessary
    handleClose();
  };

  const handleAssigneeChange = (field, value) => {
    setAssignee((prevAssignee) => ({
      ...prevAssignee,
      [field]: value,
    }));
  };

  const handleTransactionDetailsChange = (field, value) => {
    setTransactionDetails((prevTransactionDetails) => ({
      ...prevTransactionDetails,
      [field]: value,
    }));
  };
  const handleInspectionChange = (field, value) => {
    setInspection((prevInspection) => ({
      ...prevInspection,
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
          maxHeight: '80vh', // Adjust the max height as needed
          overflowY: 'auto',
        }}
      >
        <h2 id="modal-title">구매 명세서</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          {/* Assignee Fields */}
          <Box marginBottom={2}>
            <h3>구매자 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="이름"
                    value={assignee.name}
                    onChange={(e) => handleAssigneeChange('name', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="주민등록번호"
                    value={assignee.residentRegistrationNumber}
                    onChange={(e) =>
                      handleAssigneeChange('residentRegistrationNumber', e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="연락처"
                value={assignee.phoneNumber}
                onChange={(e) => handleAssigneeChange('phoneNumber', e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="주소"
                value={assignee.address}
                onChange={(e) => handleAssigneeChange('address', e.target.value)}
              />
            </FormControl>
          </Box>
          {/* Transaction Details Fields */}
          <Box marginBottom={2}>
            <h3>구매 관련 정보</h3>
            <FormControl fullWidth margin="normal">
              <TextField
                label="차량 번호"
                value={transactionDetails.newVehicleRegistrationNumber}
                onChange={(e) =>
                  handleTransactionDetailsChange('newVehicleRegistrationNumber', e.target.value)
                }
              />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker
                      label="지불 일자"
                      value={transactionDetails.balancePaymentDate}
                      onChange={(newValue) =>
                        handleInspectionChange('balancePaymentDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker
                      label="차량 인도 가능일"
                      value={transactionDetails.vehicleDeliveryDate}
                      onChange={(newValue) =>
                        handleInspectionChange('vehicleDeliveryDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="차량 인도 주소"
                value={transactionDetails.vehicleDeliveryAddress}
                onChange={(e) =>
                  handleTransactionDetailsChange('vehicleDeliveryAddress', e.target.value)
                }
              >
              </TextField>
            </FormControl>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
            <Button type="submit" variant="contained" color="success" style={{ width: 150 }}>
              요청
            </Button>
            <Button onClick={handleClose} style={{ width: 150, border: '1px solid' }}>닫기</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default SellTransactionTemplate;
