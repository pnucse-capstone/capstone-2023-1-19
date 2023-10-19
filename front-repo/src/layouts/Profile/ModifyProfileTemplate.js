import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, FormControl, TextField, Stack, Grid, MenuItem, Avatar } from '@mui/material';
import { apiBaseUrl } from 'config';
import UploadButton from 'components/UploadButton/Uploadbutton';

const ModifyProfileTemplate = ({ profileData, open, handleClose }) => {
    const [constData, setConstData] = useState(profileData);
    const [image, setImage] = useState(null);
    useEffect(() => {
        setConstData(profileData);
        setImage(null);
        setModifiedData({
            ['phoneNumber']: profileData.phoneNumber,
            ['detail']: profileData.detail,
        })
        console.log("In mypage modal ", profileData);;
    }, [profileData]);

    const [modifiedData, setModifiedData] = useState({
        phoneNumber: null,
        detail: null,
    });

    const handleImageUpload = (event) => {
        console.log("In Mypage Modal ", event.target.files[0]);
        if (event.target.files[0]) {
            const file = event.target.files[0];
            // Encode the file using the FileReader API
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("check conver 1 ",reader.result);
                // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
            };
            const fileStr = reader.readAsDataURL(file);
            console.log("check conver 2 ",fileStr);
            setImage(event.target.files[0]);
            setConstData({
                ...constData,
                ['profileImage']:fileStr
            });
            console.log("Check for image upload mypage modal", image);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit in mypage modal ", modifiedData);
        console.log("submit in mypage modal image ", image);
        const formData = new FormData();
        const apiUrl = `${apiBaseUrl}/auth/modify-profile`;
        const headers = {
            Authorization: localStorage.getItem('Authorization'),
        };
        await formData.append('dto', new Blob([JSON.stringify({
            userid:profileData.userid,
            phoneNumber: modifiedData.phoneNumber,
            detail: modifiedData.detail,
        })], {type: 'application/json'}) );
        await formData.append('image', image);

        fetch(apiUrl, {
            method: 'PATCH',
            headers,
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.result === 'SUCCESS') {
                console.log('프로필 수정 성공:', responseData);
            } else {
                throw new Error('프로필 수정이 실패했습니다.');
            }
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        })
        .finally(() => {
            // setLoading(false);
            window.location.reload();
            handleClose();
        });
    };

    const handlePhoneNumberChange = (field, value) => {
        setModifiedData((prevAssignee) => ({
          ...prevAssignee,
          [field]: value,
        }));
      };
    
      const handleDetailChange = (field, value) => {
        console.log(field)
    
        setModifiedData((prevTransactionDetails) => ({
          ...prevTransactionDetails,
          [field]: value,
        }));
      };

    return (
        <Modal
            open={open}
            onClose={handleClose}
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
                <h2 id="modal-title">프로필 수정</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <Box marginBottom={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                            label="이름"
                            value={constData.name}
                            disabled
                            />
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                            label="아이디"
                            value={constData.userid}
                            disabled
                            />
                        </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                            label="이메일"
                            value={constData.email}
                            disabled
                            />
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                            label="사용자 구분"
                            value={constData.org}
                            disabled
                            />
                        </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth margin="normal">
                        <TextField
                        label="연락처"
                        value={modifiedData.phoneNumber}
                        onChange={(e) => handlePhoneNumberChange('phoneNumber', e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                        label="자기소개"
                        value={modifiedData.detail}
                        onChange={(e) => handleDetailChange('detail', e.target.value)}
                        />
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Avatar sx={{width:250, height:250}} alt="Profile Image" src={constData.profileImage} />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth margin="normal">
                                <UploadButton handleImageUpload={handleImageUpload} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Box>
                    
                    <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                        <Button type="submit" variant="contained" color="success" style={{ width: 150 }}>
                            요청
                        </Button>
                        <Button onClick={handleClose} style={{ width: 150, border: '1px solid' }}>닫기</Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default ModifyProfileTemplate;