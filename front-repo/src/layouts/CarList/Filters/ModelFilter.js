import React from 'react';
import { TextField } from '@mui/material';

const ModelFilter = ({getChange}) => {
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
      <div style={{ width: '97%' }}>
        <TextField
          label="모델명 검색"
          name="model"
          onChange={onChange}
          variant="outlined"
          sx={{ width: '100%' }}
        />
      </div>
    </div>

  );
};

export default ModelFilter;
