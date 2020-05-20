import React from 'react';

import './NodeItem.css';

export default function NodeItem(props) {
    const nodeDetails = {
        name: "",
        content: "",
        index : props.data.index
    }
    const changeNodeDetails = (event) => {
        nodeDetails[event.target.id] = event.target.value;
        props.changeNodeDetails(nodeDetails);
    }
    return (
        <div className="node-panel">
            <div className="node-title">
                <input id="name" className="node-input" onChange={changeNodeDetails} placeholder="Task Name"></input>
            </div>
            <div className="node-content">
                <textarea id="content" className="node-content-input" onChange={changeNodeDetails} placeholder="Enter Node Details" row="6" col="5"></textarea>
            </div>
        </div>
    )
}