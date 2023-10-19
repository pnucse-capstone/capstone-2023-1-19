import React from 'react';
import './Card.css';

export default function Card({ title, usage, total, unit }) {
    return (
        <div className="cardContainer">
            <div className="cardTitle">{title}</div>
            <div className="cardContent">
                <div className="cardUsage">{usage}</div>
                {total && (
                    <div className="cardTotal">
                        &nbsp;/&nbsp;{total}
                        &nbsp;{unit}
                    </div>
                )}
            </div>
        </div>
    );
}