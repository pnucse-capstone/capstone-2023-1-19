import React, { useEffect, useState } from 'react'
import axios from "axios";
import Card from "../../components/Card/Card"
import DashboardTable from 'components/DashboardTable/DashboardTable';
import './Dashboard.css';

export default function Dashboard() {
    const [clusters, setClusters] = useState([]);
    const [quotaUsage, setQuotaUsage] = useState({});
    // const clusterData = [
    //     { name: "jaehan", status: "Active" }, 
    //     { name: "jaehan2", status: "Creating"},
    // ]

    useEffect(() => {
        axios.get("http://192.168.10.20:5000/clusters")
        .then(resp => {
            if (resp.status === 200) {
                const transformedData = resp.data.map(cluster => {
                    return {
                        clustername: cluster.clusterName,
                        status: cluster.status,
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
    }, []);

    useEffect(() => {
        axios.get("http://192.168.10.20:5000/quota/usage")
        .then(resp => {
            const data = resp.data;
            const newQuotaUsage = {
                instance: {
                    currentInstance: data.instance_usage,
                    instanceLimit: data.instance_limit,
                },
                cpu: {
                    currentCPU: data.cpu_usage,
                    cpuLimit: data.cpu_limit,
                },
                ram: {
                    currentRAM: data.ram_usage,
                    ramLimit: data.ram_limit,
                },
                storage: {
                    currentStorage: data.storage_usage,
                    storageLimit: data.storage_limit,
                }
            };
            setQuotaUsage(newQuotaUsage);
            console.log(data);
        })
        .catch(error => {
            console.error("Error getting quota usage:", error);
        })
    }, []);


    return (
        <div className='dashboard'>
            <div className='titleText'>Dashboard</div>
            <div className='cardGroup'>
                <Card title="Current Instane / Instance Limit" usage={quotaUsage.instance?.currentInstance} 
                    total={quotaUsage.instance?.instanceLimit} unit={""} />
                <Card title="Current Usage / CPU Limit" usage={quotaUsage.cpu?.currentCPU}
                    total={quotaUsage.cpu?.cpuLimit} unit={"Core"} />
                <Card title="Current Usage / RAM Limit" usage={quotaUsage.ram?.currentRAM} 
                    total={quotaUsage.ram?.ramLimit} unit={"GB"} />
                <Card title="Current Usage / Storage Limit" usage={quotaUsage.storage?.currentStorage} 
                    total={quotaUsage.storage?.storageLimit} unit={"GB"} />
            </div>
            <div className='titleText2'>Cluster Deployment</div>
            <DashboardTable data={clusters} header={["Cluster Name", "Status"]} />
        </div>
    )
}
