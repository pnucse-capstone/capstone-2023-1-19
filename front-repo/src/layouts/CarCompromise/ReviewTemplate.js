import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, FormControl, TextField,Stack,Grid} from '@mui/material';
import {apiBaseUrl } from 'config';
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';

const ReviewTemplate = ({ open, handleClose, row, setRow, change, setChange }) => {
  
  const [loading, setLoading] = useState(false); // Add this state
  const [reviewData, setReviewData] = useState({
    buyerName: row.assignee.name ,
    contractId: row.id,
    sellerName: row.assignor.name,
    carNumber: row.transactionDetails.vehicleRegistrationNumber,
    reviewRating: 0,
    reviewStr: "",
  });
  console.log(row)
  console.log(reviewData)
  const handleSubmit = () => {
    setLoading(true); 
    console.log(reviewData)
    const apiUrl = `${apiBaseUrl}/review/review-seller`;
    const headers = {
      Authorization: localStorage.getItem('Authorization'),
      'Content-Type': 'application/json',
    };
    fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('POST 요청 성공:', responseData);
        // setChange(!change);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        // setLoading(false); 
        // handleClose(); 
      });
  };
  useEffect(() => {
    setReviewData((prevReviewData) => ({
      contractId: row.id,
      buyerName: row.assignee.name ,
      sellerName: row.assignor.name,
      carNumber: row.transactionDetails.vehicleRegistrationNumber,
    }));
  }, [row]);
  const handleReviewChange = (field, value) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
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
        <h2 id="modal-title">거래 조정 관리</h2>
        <hr />
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
          <Box marginBottom={2}>
            <h3 style={{ margin: '0px' }}>리뷰 입력란</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="구매자 성함"
                    value={reviewData.buyerName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="판매자 성함"
                    value={reviewData.sellerName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="차량 번호"
                    value={reviewData.carNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="평점"
                    value={reviewData.reviewRating}
                    onChange={(e) => handleReviewChange('reviewRating', e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="리뷰 내역"
                    value={reviewData.reviewStr}
                    onChange={(e) => handleReviewChange('reviewStr', e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
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

export default ReviewTemplate;
