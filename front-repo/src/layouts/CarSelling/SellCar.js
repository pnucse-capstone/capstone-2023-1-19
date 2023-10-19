import React, { useState } from 'react';
import { Button } from '@mui/material';
import {ToastContainer, toast} from 'react-toastify';
import TransactionProcess from './TransactionProcess';
import SellTransactionTemplate from './SellTransactionTemplate';

const SellCar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    const org = localStorage.getItem('Org');
    console.log(org)
    if (org !== 'seller') {
      toast.error("판매자 회원만 차량을 판매할 수 있습니다.")
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', marginTop:"60px", flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
      <TransactionProcess />
      <SellTransactionTemplate open={open} handleClose={handleClose} />
      <Button type="submit" variant="contained" color="success" onClick={handleOpen} style={{width: 300,margin: 20, marginTop:"40px"}}>
        차량 판매하기
      </Button>
      <ToastContainer position='top-left'/>
    </div>
  );
};

export default SellCar;
