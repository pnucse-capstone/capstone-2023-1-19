import React, { useState } from 'react';
import { Paper, Grid, Button, FormControl, Box } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ModelFilter from './Filters/ModelFilter';
import AssignorFilter from './Filters/AssignorFilter';
import PeriodRangeFilter from './Filters/PeriodRangeFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import MileageRangeFilter from './Filters/MileageRangeFilter';
import CarStatusFilter from './Filters/CarStatusFilter';

const FilterForm = ({getData}) => {
  const [filters, setFilters] = useState({
    status: 'SellerRequest',
    priceFilter: false,
    mileageFilter: false,
    model: '',
    assignor: '',
    periodRangeStart: '',
    periodRangeEnd: '',
    priceRangeStart: '',
    priceRangeEnd: '',
    mileageRangeStart: '',
    mileageRangeEnd: '',
  });

  const getChange = (name, value) => {
    // console.log("change name : ", name);
    // console.log("change value :", value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    getData(filters);
    // try {
    //   // Change 'YOUR_API_URL' to your actual API endpoint
    //   const response = await axios.post('YOUR_API_URL', filters);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Paper
      style={{
        margin: 20,
        padding: 10,
        borderRadius: 10,
        border: '2px solid', // Set the border thickness here
        borderColor: 'grey'
      }}
      elevation={3} // Add a slight shadow
    >
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8.5}>
            <Box border={2} borderColor="grey.400" borderRadius={4} p={1}> {/* Reduced padding from p={2} to p={1} */}
              <ModelFilter getChange={getChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Box border={2} borderColor="grey.400" borderRadius={4} p={1}> {/* Reduced padding from p={2} to p={1} */}
              <CarStatusFilter getChange={getChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box border={2} borderColor="blue" borderRadius={4} p={1} bgcolor="#1A67C8"> {/* Reduced padding from p={2} to p={1} */}
              <IconButton type="submit" onClick={handleSubmit} aria-label="search">
                <SearchIcon style={{ fill: "white" }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box border={2} borderColor="grey.400" borderRadius={4} p={1}> {/* Reduced padding from p={2} to p={1} */}
              <AssignorFilter getChange={getChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box border={2} borderColor="grey.400" borderRadius={4} p={1}> {/* Reduced padding from p={2} to p={1} */}
              <PeriodRangeFilter getChange={getChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box border={2} borderColor="grey.400" borderRadius={4} p={1}> {/* Reduced padding from p={2} to p={1} */}
              <PriceRangeFilter getChange={getChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box border={2} borderColor="grey.400" borderRadius={4} p={1}> {/* Reduced padding from p={2} to p={1} */}
              <MileageRangeFilter getChange={getChange} />
            </Box>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  );
};

export default FilterForm;
