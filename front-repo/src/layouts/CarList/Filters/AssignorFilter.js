import React from 'react';
import { TextField } from '@mui/material';

const AssignorFilter = ({getChange}) => {
  const onChange = (event) => {
    // console.log("in filter ", event);
    getChange(event.target.name , event.target.value);
  };
  return (
    <div
      style={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '95%' }}>
        <TextField
          label="판매자 검색"
          name="assignor"
          onChange={onChange}
          variant="outlined"
          sx={{ width: '100%' }}
        />
      </div>
    </div>

  );
};

export default AssignorFilter;
