import React, {useEffect, useState} from 'react';
import './Cluster.css';
import axios from 'axios';
import DashboardTable from 'components/DashboardTable/DashboardTable';
import { Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';

export default function Cluster() {
    const [clusters, setClusters] = useState([]);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [iframeURL, setIframeURL] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [formData, setFormData] = useState({
        clusterName: '',
        workerNodeCount: '',
        masterNodeCount: '',
        nodeImage: '',
        flavorDetails: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.clusterName || !formData.nodeImage || 
            !formData.flavorCpu || !formData.flavorRam || 
            !formData.flavorDisk || !formData.masterNodeCount || 
            !formData.workerNodeCount) {
            alert("유효한 데이터를 입력해주십시오.");
            return;
        }
    
        const requestData = {
            clusterName: formData.clusterName,
            NodeImage: formData.nodeImage,
            FlavorVcpu: parseInt(formData.flavorCpu),
            FlavorRam: parseInt(formData.flavorRam),
            FlavorDisk: parseInt(formData.flavorDisk),
            MasterCount: parseInt(formData.masterNodeCount),
            WorkerCount: parseInt(formData.workerNodeCount)
        };
    
        console.log(requestData);
    
        axios.post("http://192.168.10.20:5000/cluster/create", requestData)
            .then(response => {
                if (response.status === 201) {
                    console.log(response.data.message);
                    alert("구축이 진행됩니다"); 
                } else {
                    console.error("Failed to create cluster");
                }
            })
            .catch(error => {
                console.error("Error creating cluster:", error);
            });
        
        handleClose();
    };

    useEffect(() => {
        axios.get("http://192.168.10.20:5000/images")
        .then(imageresp => {
            if (imageresp.status === 200) {
                setImages(imageresp.data);
                axios.get("http://192.168.10.20:5000/clusters")
                .then(resp => {
                    if (resp.status === 200) {
                        const transformedData = resp.data.map(cluster => {
                            let monitorLink = cluster.bastionIP ? `${cluster.bastionIP}:3000` : "Pending"; 
                            let imageName = imageresp.data.find(image => image.uuid === cluster.nodeImage)?.name || cluster.nodeImage;
                            
                            return {
                                clustername: cluster.clusterName,
                                nodeimage: imageName,
                                nodeflavor: `k8s-${cluster.clusterName}-flavor`, 
                                flavorDetails: {
                                    cpu: `${cluster.flavorVcpu} Cores`,
                                    ram: `${cluster.flavorRam}MB`,
                                    storage: `${cluster.flavorDisk}GB`
                                },
                                masternode: cluster.masterCount.toString(),
                                workernode: cluster.workerCount.toString(),
                                status: cluster.status,
                                monitor: monitorLink 
                            }
                        });
                        setClusters(transformedData);
                    } else {
                        console.error("Failed to fetch clusters");
                    }
                })
                .catch(error => {
                    console.error("Error fetching clusters:", error);
                });
    
            } else {
                console.error("Failed to fetch images");
            }
        })
        .catch(error => {
             console.error("Error fetching images:", error); 
        });
    }, []);

    const handleDelete = () => {
        if (selectedCluster) {
            console.log(selectedCluster.clustername);
            axios.delete("http://192.168.10.20:5000/cluster/delete", {
                params: {
                    clusterName: selectedCluster.clustername
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.status === 201) {
                    console.log(response.data.message);
                } else {
                    console.error("Failed to delete the cluster");
                }
            })
            .catch(error => {
                console.error("Error deleting the cluster:", error);
            });
        }
    }
    
    return (
        <div className='cluster'>
            <div className='titleText'>Kubernetes Cluster</div>
            <div className='buttonContainer'>
                <Button variant="contained" onClick={handleOpen} >Create Cluster</Button>
                <Button variant="contained" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Cluster</Button>
                <Button variant="contained" onClick={() => window.location.reload()} style={{ marginLeft: '10px' }} >Refresh</Button>
            </div>
            <DashboardTable 
                data={clusters} 
                header={["Cluster Name", "Node Image", "Node Flavor", "Master Node", "Worker Node", "Status", "Monitor"]} 
                selectable={true} 
                fontWeight={400}
                onRowSelect={(row) => setSelectedCluster(row)}
                onMonitorClick={(url) => setIframeURL(url)}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="cluster-modal-title"
                aria-describedby="cluster-modal-description"
            >
                <div className="modalContent">
                    <h2 id="cluster-modal-title">Create Cluster</h2>
                    <hr style={{color: 'grey'}}/>
                    <form>
                        <TextField label="Cluster Name" name="clusterName" value={formData.clusterName} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Master Node Count" name="masterNodeCount" value={formData.masterNodeCount} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Worker Node Count" name="workerNodeCount" value={formData.workerNodeCount} onChange={handleChange} fullWidth margin="normal" />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Node Image</InputLabel>
                            <Select name="nodeImage" value={formData.nodeImage} onChange={handleChange}>
                                {images.filter(image => image.name.startsWith("Ubuntu")).map(image => (
                                    <MenuItem key={image.uuid} value={image.uuid}>{image.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField label="Flavor CPU" name="flavorCpu" value={formData.flavorCpu} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Flavor RAM (MB)" name="flavorRam" value={formData.flavorRam} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Flavor Disk (GB)" name="flavorDisk" value={formData.flavorDisk} onChange={handleChange} fullWidth margin="normal" />
                        <Stack direction="row" spacing={2} justifyContent="center" marginTop={2}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
                            <Button variant='contained' color='primary' onClick={handleClose}>Close</Button>
                        </Stack>
                    </form>
                </div>
            </Modal>
            {iframeURL && (
                <div style={{marginTop: '30px'}}>
                    <iframe 
                        src={iframeURL}
                        title="Monitoring Dashboard" 
                        width="100%" 
                        height="600px" 
                        frameBorder="0">
                    </iframe>
                </div>
)}
        </div>
    );
}