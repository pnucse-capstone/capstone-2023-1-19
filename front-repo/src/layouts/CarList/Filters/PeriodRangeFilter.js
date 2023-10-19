import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker, TextFieldProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PeriodRangeFilter = ({getChange}) => {

  const onChange = (name, value) => {
    // console.log("in filter ", value.format('YYYY-MM-DD'));
    getChange(name , value.format('YYYY-MM-DD'));
  };
  const startChange = (value) => {
    setStartDate(value);
    onChange("periodRangeStart", value);
  };
  const endChange = (value) => {
    setEndDate(value);
    onChange("periodRangeEnd", value);
  };

  const now = dayjs();
  const ago = dayjs().subtract(1, "y");
  const [startDate, setStartDate] = useState(ago);
  const [endDate, setEndDate] = useState(now);

  useEffect(() => {
    onChange("periodRangeStart", startDate);
    onChange("periodRangeEnd", endDate);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <div style={{ display: 'flex', gap: 30 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Search start date"
            value={startDate}
            onChange= { newValue => startChange(newValue)}
          >
            {({ inputRef, inputProps }: TextFieldProps) => (
              <TextField
                {...inputProps}
                inputRef={inputRef}
                fullWidth
              />
            )}
          </DesktopDatePicker>
          <DesktopDatePicker
            label="Search end date"
            value={endDate}
            onChange = {newValue => endChange(newValue)}
          >
            {({ inputRef, inputProps }: TextFieldProps) => (
              <TextField
                {...inputProps}
                inputRef={inputRef}
                fullWidth
              />
            )}
          </DesktopDatePicker>
        </LocalizationProvider>
      </div>
    </Box>
  );
};

export default PeriodRangeFilter;
