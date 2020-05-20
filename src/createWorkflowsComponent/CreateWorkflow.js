

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';

import './CreateWorkflow.css';
import NodeItem from '../commonComponents/nodeItemComponent/NodeItem';

export default function CreateWorkflow() {
    const workflowDetails = {
        name: "",
        status: "PENDING",
        nodes: []
    }
    const [navigateToWorkflowsRoute, setNavigateToWorkflowsRoute] = useState(false);
    const [details, setDetails] = useState(workflowDetails);
    const saveWorkflowName = (event) => {
        const name = event.target.value;
        setDetails((prevState)=> ({...prevState, 'name' : name }))
    }
    const addNode = () => {
        const nodes = details.nodes;
        nodes.push({
            name: "",
            content: "",
            status: "PENDING"
        })
        setDetails((prevState)=> ({...prevState, 'nodes': nodes }))
    }
    const deleteNode = () => {
        const nodes = details.nodes;
        nodes.pop();
        setDetails((prevState)=> ({...prevState, 'nodes': nodes }))

    }
    const changeNodeStatus = (index, selectedNode) => {
        const nodes = details.nodes;
        switch (selectedNode.status) {
            case "PENDING": {
                nodes[index].status = "IN-PROGRESS"
                break;
            }
            case "IN-PROGRESS": {
                nodes[index].status = "COMPLETED"
                break;
            }
            default : {
                nodes[index].status = "PENDING"
                break;
            }
        }
        setDetails((prevState)=> ({...prevState, 'nodes': nodes }))
    }
    const changeNodeDetails = (nodeDetails) => {
        const nodes = details.nodes;
        nodes[nodeDetails.index].name = nodeDetails.name;
        nodes[nodeDetails.index].content = nodeDetails.content;
        setDetails((prevState)=> ({...prevState, 'nodes': nodes }))
    }
    const saveWorkFlow = () => {
        const workflows = JSON.parse(localStorage.getItem('workflows'));
        workflows.push(details);
        localStorage.setItem('workflows', JSON.stringify(workflows));
        setNavigateToWorkflowsRoute(true);
    }

    if (navigateToWorkflowsRoute == true) {
        return <Redirect to='/workflows' />
    }
    return [
    <div className="workflow-head">
        <a href="workflows"><Button className="back-btn">Back</Button></a>
        <div>
            <input id ="name" onChange={saveWorkflowName} placeholder="Enter Name"></input>
        </div>
        <Button className="button-suffle">Shuffle</Button>
        <Button className="delete" onClick={deleteNode}>Delete</Button>
        <Button className="button-node" onClick={addNode}>+ Add Node</Button>
        <Button onClick={saveWorkFlow} disabled = {!details.nodes.length}>Save</Button>
    </div>,
    <div className="nodes-layout">
        <RenderNodeItems nodes={details.nodes} changeNodeStatus = {changeNodeStatus} changeNodeDetails = {changeNodeDetails}/>
    </div>

    ];

}

function RenderNodeItems(props) {
    const nodeItems = props.nodes;
    const changeNodeStatus = (index, nodeItem) => {
        props.changeNodeStatus(index,nodeItem);
    }
    const changeNodeDetails = (details) => {
        props.changeNodeDetails(details);
    }
    return (nodeItems && nodeItems.length? nodeItems.map((nodeItem,index) => {
        let statusStyle = {};
        if (nodeItem.status == "IN-PROGRESS") {
            statusStyle = {'background': 'lightblue'}
        }
        if (nodeItem.status == "COMPLETED") {
            statusStyle = {'background': 'lightgreen'  }
        }
        nodeItem['index'] = index;
        return [<NodeItem data={nodeItem} changeNodeDetails= {changeNodeDetails}></NodeItem>, <span onClick={() =>  changeNodeStatus(index, nodeItem)} className="state-icon" style={statusStyle}>&#10004; </span>]
    })
    : <p className="info">Add nodes to the workflows</p>
    )
}