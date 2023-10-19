import React, { useState } from 'react';
import { Slider, Typography, TextField } from '@mui/material';

const MileageRangeFilter = ({getChange}) => {
  const onChange = (type) => {
    // console.log("in filter ", event);
    getChange("mileageFilter" , true);
    if (type == 'start')
      getChange("mileageRangeStart" , mileageRange[0]);
    else
      getChange("mileageRangeEnd" , mileageRange[1]);
  };
  const [mileageRange, setMileageRange] = useState([0, 300000]); // Initial range: 0 to 300000 (in kilometers)
  const minMileage = mileageRange[0];
  const maxMileage = mileageRange[1];

  const handleSliderChange = (event, newValue) => {
    setMileageRange(newValue);
    onChange("start");
    onChange("end");
  };

  const handleMinMileageChange = (event) => {
    let newMinMileage = parseInt(event.target.value);
    newMinMileage = isNaN(newMinMileage) ? 0 : newMinMileage;
    setMileageRange([newMinMileage, mileageRange[1]]);
    onChange("start");
  };

  const handleMaxMileageChange = (event) => {
    let newMaxMileage = parseInt(event.target.value);
    newMaxMileage = isNaN(newMaxMileage) ? 0 : newMaxMileage;
    setMileageRange([mileageRange[0], newMaxMileage]);
    onChange("end");
  };

  const valueLabelFormat = (value) => {
    if (value < 10000) {
      return `${value}KM`;
    } else {
      const tenThousandUnits = Math.floor(value / 10000);
      return `${tenThousandUnits}만KM`;
    }
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
        <Slider
          value={mileageRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="mileage-range-slider"
          min={0}
          max={300000}
          step={1000}
          valueLabelDisplay="on"
          valueLabelFormat={value => valueLabelFormat(value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%'}}>
        <TextField
          label="Minimum Mileage (KM)"
          value={minMileage}
          onChange={handleMinMileageChange}
          type="number"
          size="small"
          style={{ width:200, marginLeft : 5, marginRight:5 }}
          inputProps={{ min: 0, max: maxMileage, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Maximum Mileage (KM)"
          value={maxMileage}
          onChange={handleMaxMileageChange}
          type="number"
          size="small"
          style={{ width:200, marginLeft : 5, marginRight:5 }}
          inputProps={{ min: minMileage, max: 300000, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

export default MileageRangeFilter;
