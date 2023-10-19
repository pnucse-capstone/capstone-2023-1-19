import React, { useState } from 'react';
import { Button } from '@mui/material';

import TransactionProcess from './TransactionProcess';
import SellTransactionTemplate from './SellTransactionTemplate';

const SellCar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
      <TransactionProcess />
      <SellTransactionTemplate open={open} handleClose={handleClose} />
      <Button type="submit" variant="contained" color="success" onClick={handleOpen} style={{width: 300,margin: 20}}>
        차량 판매하기
      </Button>
    </div>
  );
};

export default SellCar;
