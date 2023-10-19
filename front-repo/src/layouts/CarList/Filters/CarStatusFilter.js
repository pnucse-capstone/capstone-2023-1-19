import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CarStatusFilter = ({getChange}) => {
    const [status, setStatus] = React.useState('SellerRequest');
    const onChange = (event) => {
        console.log("in filter ", event);
        setStatus(event.target.value);
        getChange("status" , event.target.value);
    };
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={1}
        >
            <FormControl style={{width:"100%"}}>
                <InputLabel id="car-status">Status</InputLabel>
                <Select
                    labelId="car-status"
                    id="car-status-select"
                    value={status}
                    label="Status"
                    onChange={onChange}
                >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'SoldOut'}>SoldOut</MenuItem>
                    <MenuItem value={'SellerRequest'}>SellerRequest</MenuItem>
                    <MenuItem value={'BuyerRequest'}>BuyerRequest</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default CarStatusFilter;

