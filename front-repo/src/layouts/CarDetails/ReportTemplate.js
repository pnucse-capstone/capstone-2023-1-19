import React, { useState } from 'react';
import { Button, Modal, Box, FormControl, TextField, Stack, Grid, MenuItem } from '@mui/material';

const ReportTemplate = ({ type, reportOpen, handleReportClose }) => {
    const [report, setReport] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
    //   const data = {
    //     assignee,
    //     transactionDetails,
    //     inspection,
    //   };
    //   console.log(data);
      // Reset state here if necessary
      alert("신고가 완료 되었습니다.");
      handleReportClose();
    };

    const handleReportChange = (event) => {
        setReport(event.target.value);
    };

    return (
      <Modal
        open={reportOpen}
        onClose={handleReportClose}
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
          <h2 id="modal-title">{type} 신고</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                        <TextField
                            label="신고 사유"
                            value={report}
                            onChange={handleReportChange}
                        />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
              <Button type="submit" variant="contained" color="success" style={{ width: 150 }}>
                요청
              </Button>
              <Button onClick={handleReportClose} style={{ width: 150, border: '1px solid' }}>닫기</Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    );
  };

  export default ReportTemplate;
