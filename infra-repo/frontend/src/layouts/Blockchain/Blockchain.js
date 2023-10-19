import React from 'react'
import './Blockchain.css';

export default function Blockchain() {
    const grafanaUrl = "http://223.130.161.154:3000"

    return (
    <div className='blockchain-container'>
        <iframe 
            className='grafana-iframe'
            src={grafanaUrl}
            title="Blockchain Monitoring Dashboard"
            frameBorder="0"/>
    </div>
    )
}
