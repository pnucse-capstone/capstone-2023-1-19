import React, { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import jsonData from '../../assets/ixData.json';
import { apiBaseUrl } from 'config';
import Button from '@mui/material/Button'; // Material UI의 Button 컴포넌트를 import
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import InspectionTemplate from './InspectionTemplate';

function GridComponent() {
  

  const [loadingData, setLoadingData] = useState(false); // Add this state
  const [inspections, setInspections] = useState([])
  const [data, setData] = useState(jsonData);
  const [change, setChange] = useState(false)
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({
    id: 0, // 인덱스
    inspectionStatus: false, // 검수 상태
    requestDate: '2023-07-01', // 요청 일자
    inspectionDate: '2023-07-26', // 검수 일자
    vehicleBasicInfo: {
      vehicleIdentificationNumber: '1HGCM82633A123456', // 차량 식별 번호
      vehicleModelName: 'Toyota Camry', // 차량 모델명
      vehicleRegistrationNumber: 'ABCD123', // 차량 번호
      gearboxType: 'Automatic', // 기어 종류
      fuelUsed: 'Gasoline', // 사용 연료 종류
      mileage: 10000, // 주행거리
      color: 'Silver', // 색상
      options: 'Navigation, Leather Seats, Sunroof', // 차량 옵션
    },
    vehicleDetailInfo: {
      tuning: 'None', // 튜닝 정보
      outerPlate: 'Good', // 외판 상태
      vehicleFrame: 'Intact', // 프레임 상태
      motor: 'Engine in good condition', // 모터
      transmission: 'Smooth', // 변속기
      steering: 'Responsive', // 조종
      braking: 'Effective', // 브레이크
      electricity: 'All electrical systems functional', // 전기
      fuel: 'No leaks or issues', // 연료
      exterior: 'Clean and well-maintained', // 외형 상태 , 익스테리어
      interior: 'Neat and tidy', // 내부 상태, 인테리어
      gloss: 'Shiny', // 광택
      wheel: 'Good condition', // 휠
      tire: 'Adequate tread depth', // 타이어
      glass: 'No cracks or chips', // 유리
    },
    images: {
      inside: 'https://example.com/car_images/inside.jpg', // 내부 이미지
      outside: 'https://example.com/car_images/outside.jpg', // 외부 이미지
      front: 'https://example.com/car_images/front.jpg', // 전면 이미지
      left: 'https://example.com/car_images/left.jpg', // 좌측 이미지
      right: 'https://example.com/car_images/right.jpg', // 우측 이미지
      back: 'https://example.com/car_images/back.jpg', // 후면 이미지
    },
    etc: 'I think...', // 기타 검수자 소견
  });
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {   
    getNewDatas(setInspections, data, setData,inspections)
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  useEffect(() => {
    setLoadingData(true); // Set loading to true before fetching data

    getNewDatas(setInspections, data, setData, inspections)
      .finally(() => setLoadingData(false)); // Set loading to false when the fetch is complete
  }, [change]);

  const columns = [
    { field: 'id', headerName: '인덱스', flex: 0.5 },
    { field: 'vehicleIdentificationNumber', headerName: '차량 식별번호', flex: 1.5 },
    { field: 'requestDate', headerName: '검수 요청 일자', flex: 1.5 },
    { field: 'vehicleModelName', headerName: '모델명', flex: 1.5 },
    { field: 'vehicleRegistrationNumber', headerName: '차량 번호', flex: 1.5 },
    { field: 'mileage', headerName: '주행거리', flex: 1 },
    { field: 'gearboxType', headerName: '기어', flex: 1 },
    { field: 'fuelUsed', headerName: '사용 연료', flex: 1 },
    { field: 'color', headerName: '색상', flex: 1 },
    { field: 'options', headerName: '추가 옵션', flex: 1.5 },
    {
      field: '검수 결과 입력',
      headerName: '검수 결과 입력',
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleResultInputClick(params.row)}
          >
            결과 입력
          </Button>
        );
      },
    },
  ];

  const handleRowClick = (params) => {
    const id = params.row.id;
    // navigate(`/buy/${id}`);
  };

  const handleResultInputClick = (row) => {
    // 결과 입력 버튼 클릭 시 실행할 동작 추가
    const foundInspection = inspections.find(obj => obj.id == row.id);
    console.log(foundInspection);
    setRow(foundInspection)
    handleOpen()
  };

  return (
    <div style={{ width: '90%', border: '2px solid', borderColor: '#888888', borderRadius: 10 }}>
      {loadingData && <CircularIndeterminate />} {/* Show loading indicator */}
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        columnBuffer={5}
        // pageSizeOptions={[5, 10, 20]}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        onRowClick={handleRowClick}
        style={{ width: '100%' }}
      />
      <InspectionTemplate open={open} handleClose={handleClose} row={row} setRow={setRow} change={change} setChange={setChange} />
    </div>
  );
}

function getNewDatas(setInspections, data, setData, inspections) {
  const apiUrl = `${apiBaseUrl}/car-info/inspec-all`;
  const headers = {
    Authorization: localStorage.getItem('Authorization'),
  };

  return fetch(apiUrl, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((fetchedData) => {
      setInspections(fetchedData.data);
      const filteredData = fetchedData.data.filter((item) => !item.inspectionStatus);
      const modifiedData = filteredData.map((item) => ({
        id: item.id,
        requestDate: item.requestDate,
        ...item.vehicleBasicInfo,
      }));
      setData(modifiedData);
      console.log(fetchedData.data)
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export default GridComponent;
