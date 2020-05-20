

import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';

import './Workflows.css';
import WorkflowItem from '../commonComponents/workflowItemComponent/WorkflowItem';
function RenderWorkflows(props) {
    const [updateNow, setUpdateNow] = useState(true);
    const workflows = JSON.parse(localStorage.getItem('workflows'));
    const changeWorkflowStatus = (index, details) => {
        if(details.status == "PENDING") {
            workflows[index].status = "COMPLETED"
        } else {
            workflows[index].status = "PENDING"
        }
        localStorage.setItem('workflows', JSON.stringify(workflows))
        setUpdateNow(!updateNow);
    }
    useEffect(()=> {

    })
    return (workflows && workflows.length ? workflows.map((workflow, index) => {
        workflow['index'] = index;
        if (!workflow.name.toLowerCase().includes(props.searchName)) {
            return null
        }
        return <WorkflowItem data={workflow} changeWorkflowStatus={changeWorkflowStatus}></WorkflowItem>
    })
    : <p className="info">Add your workflow with node details</p>
    )
}
export default function Workflows() {
    const [searchName, setSearchName] = useState('');
    const waitForUserTopStopTyping = function(searchFunction, timer)  {
        let timerId;
        return function(...searchArgs) {
            const context = this;
            const value = searchArgs[0].target.value;
            clearTimeout(timerId);
            timerId = setTimeout(function() {
                searchFunction.call(context, value)
            }, timer);
        }
        
    }
    const searchWorkflows = (name) => {
        setSearchName(name)
    } 
    const debounceSearchValue = waitForUserTopStopTyping(searchWorkflows, 300)
    return [
    <div className="workflow-head">
        <div className="workflow-filter">
            <a href="/#/login" className="btn-head"><Button className="back-btn">Logout to clear the workflows</Button></a>

            <input type="search" className="search-input" placeholder="Search for the workflows by name" onChange={debounceSearchValue}></input>
        </div>
        <a href="/#/workflowDetails" className="btn-create"><Button className="button-create">+ Create Workflow</Button></a>
    </div>,
    <div className="workflow-items">
        <RenderWorkflows searchName = {searchName}></RenderWorkflows>
    </div>

    ];

}