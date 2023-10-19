import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import React from 'react';
import GridComponent from './GridComponent';
const InspectionDashboard = ( ) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', marginTop:30 }}>
      <GridComponent/>
    </div>
  );
};

export default InspectionDashboard;