import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import EngineeringIcon from '@mui/icons-material/Engineering';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Card } from '@mui/material';
import { apiBaseUrl,bearerToken } from 'config';

const useStyles = makeStyles({
  processIcon: {
    width: 80,
    height: 80,
    border: '2px solid',
    borderRadius: '50%',
    borderColor: '#D3D3D3',
    padding: '5px',
  },
  line: {
    height: 2, // Updated height to 100%
    width: '10%', // Updated width to 3
    backgroundColor: '#D3D3D3',
  },
  processStep: {
    height: '100%', // Updated height to 100%
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', // Added spacing between elements
    gap: '10px',
    position: 'relative', // Added position relative for positioning lines
  },
  stepIcon: {
    fontWeight: 'bold',
    backgroundColor: '#DBE7FF',
    color: '#585c74',
    borderRadius: '10px',
    padding: '5px 10px',
  },
  processTitle: {
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center', // Added textAlign property
    margin: 5,

  },
  description: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid',
    borderRadius: 10,
    borderColor: '#D3D3D3',
    padding: '10px',
    textAlign: 'center'
  },
  card: {
    width: '90%',
    height: '100%',
    padding: 30,
    border: '2px solid',
    borderRadius: 10,
    borderColor: '#9A9A9A',
  }
});

const TransactionProcess = () => {
  const classes = useStyles();
  return (
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
            중고차 거래 프로세스
        </Typography>
        <hr/>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div className={classes.processStep}>
            <TimeToLeaveIcon className={classes.processIcon} />
            <div className={classes.stepIcon}>STEP 1</div>
            <div className={classes.description}>
                <Typography className={classes.processTitle}>판매 요청 명세서 작성</Typography>
                <hr style={{width : '100%'}}/>
                <Typography>차량 판매를 위한 명세서에 <br/> 정보를 기입합니다.</Typography>
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.processStep}>
            <EngineeringIcon className={classes.processIcon} />
            <div className={classes.stepIcon}>STEP 2</div>
            <div className={classes.description}>
                <Typography className={classes.processTitle}>차량 검수</Typography>
                <hr style={{width : '100%'}}/>
                <Typography>인증된 검수 기관에 의해 <br/> 차량 검수를 진행합니다.</Typography>
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.processStep}>
            <OpenInBrowserIcon className={classes.processIcon} />
            <div className={classes.stepIcon}>STEP 3</div>
            <div className={classes.description}>
                <Typography className={classes.processTitle}>대시보드 업로드</Typography>
                <hr style={{width : '100%'}}/>
                <Typography>검수가 완료된 차량은 구매 대시보드에 업로드됩니다.</Typography>
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.processStep}>
            <EventAvailableIcon className={classes.processIcon} />
            <div className={classes.stepIcon}>STEP 4</div>
            <div className={classes.description}>
                <Typography className={classes.processTitle}>구매자와 일정 조정</Typography>
                <hr style={{width : '100%'}}/>
                <Typography>구매자와 잔금 지불 및 차량 인도 일정을 조정합니다.</Typography>
            </div>
          </div>
          <div className={classes.line} />
          <div className={classes.processStep}>
            <PriceCheckIcon className={classes.processIcon} />
            <div className={classes.stepIcon}>STEP 5</div>
            <div className={classes.description}>
                <Typography className={classes.processTitle}>거래 수행</Typography>
                <hr style={{width : '100%'}}/>
                <Typography>조정이 완료되면 자동적으로 거래가 성사됩니다.</Typography>
            </div>
          </div>
        </Box>
      </Card>
  );
};

export default TransactionProcess;
