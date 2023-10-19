import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadButton({handleImageUpload}) {
  const getImage = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      handleImageUpload(event);
      console.log("Check for image upload in uploadbutton", event.target.files[0]);
    }
  };

  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <input type="file" name="image" style={{display:"none"}} onChange={getImage} />
    </Button>
  );
}