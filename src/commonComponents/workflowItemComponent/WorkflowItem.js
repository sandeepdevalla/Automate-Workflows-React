import React from 'react';

import './WorkflowItem.css';

export default function WorkflowItem(props) {
    let statusStyle = {};
    if (props.data.status == "COMPLETED") {
        statusStyle = {'background': 'lightgreen'  }
    }
    const changeWorkflowStatus = (index, details) => {
        props.changeWorkflowStatus(index, details)
    }
    return (
        <div className="workflow-panel">
            <div className="workflow-title">
                {props.data.name}
            </div>
            <div className="workflow-content">
                <p>{props.data.status} </p>
                <span onClick={() => changeWorkflowStatus(props.data.index, props.data)} className="state-icon" style={statusStyle}>&#10004; </span>
            </div>
        </div>
    )
}