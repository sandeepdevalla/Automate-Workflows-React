

import React from 'react';

import './Workflows.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workflows() {
return [<h2>Can see all the workflows</h2>,
<Link to="workflowDetails"><Button>Create</Button></Link>];

}