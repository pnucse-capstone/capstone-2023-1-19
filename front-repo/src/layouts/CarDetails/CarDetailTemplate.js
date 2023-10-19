import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Modal, Box, FormControl, TextField, Stack, Grid, MenuItem } from '@mui/material';

const CarDetailTemplate = ({ detailData, setDetailData, detailOpen, handleDetailClose }) => {
    const [report, setReport] = useState("");
    const [data, setData] = useState(detailData);
    useEffect(() => {
        setData(detailData);
      }, [detailData]);

    const containerStyles = {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };

      const flattenObject = (obj, prefix = '') => {
        if (obj === undefined || obj === null) {
          return {};
        }
        return Object.keys(obj).reduce((acc, key) => {
          const propKey = prefix ? `${prefix}.${key}` : key;
          const value = obj[key];
          if (typeof value === 'object' && value !== null) {
            return { ...acc, ...flattenObject(value, propKey) };
          } else {
            return { ...acc, [propKey]: value };
          }
        }, {});
      };

      const flattenedData = flattenObject(data);

      const labelMap = {
        'vehicleBasicInfo.vehicleIdentificationNumber': '차량 식별 번호',
        'vehicleBasicInfo.vehicleModelName': '차량 모델명',
        'vehicleBasicInfo.vehicleRegistrationNumber': '차량 번호',
        'vehicleBasicInfo.gearboxType': '기어 종류',
        'vehicleBasicInfo.fuelUsed': '사용 연료 종류',
        'vehicleBasicInfo.mileage': '주행거리',
        'vehicleBasicInfo.color': '색상',
        'vehicleBasicInfo.options': '차량 옵션',
        'vehicleDetailInfo.tuning': '튜닝 정보',
        'vehicleDetailInfo.outerPlate': '외판 상태',
        'vehicleDetailInfo.vehicleFrame': '프레임 상태',
        'vehicleDetailInfo.motor': '모터',
        'vehicleDetailInfo.transmission': '변속기',
        'vehicleDetailInfo.steering': '조종',
        'vehicleDetailInfo.braking': '브레이크',
        'vehicleDetailInfo.electricity': '전기',
        'vehicleDetailInfo.fuel': '연료',
        'vehicleDetailInfo.exterior': '외형 상태 , 익스테리어',
        'vehicleDetailInfo.interior': '내부 상태, 인테리어',
        'vehicleDetailInfo.gloss': '광택',
        'vehicleDetailInfo.wheel': '휠',
        'vehicleDetailInfo.tire': '타이어',
        'vehicleDetailInfo.glass': '유리',
        'etc': '검수자 소견'
      };
    
      const subheadingStyles = {
        fontWeight: 'bold',
        marginTop: '16px',
      };
    
      const pairStrings = Object.entries(flattenedData).map(([key, value]) => {
        // console.log("check modikey ",labelMap[key]);
        if (labelMap[key] !== undefined) {
            const modifiedKey = labelMap[key];
            return `${modifiedKey}: ${value}`;
        } else { return null; }
      }).filter(pair => pair !== null);

    return (
      <Modal
        open={detailOpen}
        onClose={handleDetailClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)', // Adjusted boxShadow for a more three-dimensional look
            width: '90vh', // Adjust the width as needed
            maxHeight: '80vh', // Adjust the max height as needed
            overflowY: 'auto',
          }}
        >
          <h2 id="modal-title">차량 상세 정보</h2>
          <hr />
          <Card>
              <CardContent>
                {pairStrings.map((pairString, index) => {
                  const [key, value] = pairString.split(': ');
                  return (
                    <Typography key={index} sx={{ marginTop: '8px' }}>
                      <span style={{ color: 'grey', fontWeight: 'bold' }}>{key}</span>: <span>{value}</span>
                    </Typography>
                  )
                })}
              </CardContent>
            </Card>
            <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
              <Button onClick={handleDetailClose} style={{ width: 150, border: '1px solid' }}>닫기</Button>
            </Stack>
        </Box>
      </Modal>
    );
  };

  export default CarDetailTemplate;
