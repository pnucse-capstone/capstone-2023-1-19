import React, { useState } from 'react';
import { Slider, Typography, TextField } from '@mui/material';

const PriceRangeFilter = ({getChange}) => {
  const onChange = (type) => {
    // console.log("in filter ", event);
    getChange("priceFilter" , true);
    if (type == 'start')
      getChange("priceRangeStart" , priceRange[0]);
    else
      getChange("priceRangeEnd" , priceRange[1]);
  };
  const [priceRange, setPriceRange] = useState([0, 500000000]); // Initial range: 0 to 1 billion (in won)
  const minPrice = priceRange[0];
  const maxPrice = priceRange[1];

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    onChange("start");
    onChange("end");
  };

  const handleMinPriceChange = (event) => {
    let newMinPrice = parseInt(event.target.value);
    newMinPrice = isNaN(newMinPrice) ? 0 : newMinPrice * 10000; // Here, multiplied the value with 1000000
    setPriceRange([newMinPrice, priceRange[1]]);
    onChange("start");
  };

  const handleMaxPriceChange = (event) => {
    let newMaxPrice = parseInt(event.target.value);
    newMaxPrice = isNaN(newMaxPrice) ? 0 : newMaxPrice * 10000; // Here, multiplied the value with 1000000
    setPriceRange([priceRange[0], newMaxPrice]);
    onChange("end");
  };

  const valueLabelFormat = value => {
    const units = ['', '만', '억', '조', '경']; // Units in Korean
    let magnitude = 0;

    while (value >= 10000) {
      value /= 10000;
      magnitude++;
    }

    const formattedValue = magnitude >= 2 ? value.toFixed(2) : Math.round(value);
    return `${formattedValue}${units[magnitude]}원`;
  };

  return (
    <div
      style={{
        padding : 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '95%' }}>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
          min={0}
          max={500000000}
          step={1000000}
          valueLabelDisplay="on"
          valueLabelFormat={value => valueLabelFormat(value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%'}}>
        <TextField
          label="Minimum Price (만원)"
          value={minPrice / 10000}
          onChange={handleMinPriceChange}
          type="number"
          size="small"
          style={{width:200, marginLeft : 5, marginRight:5 }}
          inputProps={{ min: 0, max: maxPrice / 10000, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Maximum Price (만원)"
          value={maxPrice / 10000}
          onChange={handleMaxPriceChange}
          type="number"
          size="small"
          style={{width:200, marginLeft : 5, marginRight:5 }}
          inputProps={{ min: minPrice / 10000, max: 500000000 / 10000, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
