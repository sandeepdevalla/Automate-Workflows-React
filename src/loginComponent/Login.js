import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {Button, InputGroup, FormControl} from 'react-bootstrap'

import './Login.css';

export default function Login() {
    const userDetails = {
        Username: '',
        Password: ''
    }
    const [loginDisable, setLoginDisable] = useState(true);
    const [navigateToWorkflowsRoute, setNavigateToWorkflowsRoute] = useState(false);
    const [{Username, Password}, setUserDetails] = useState(userDetails);
    useEffect(()=>{
        if(Username && Password) {
            setLoginDisable(false);
            localStorage.setItem('login',true);
        } else {
            setLoginDisable(true);
            localStorage.setItem('login',false);
        }
    })
    const getUserDetails = (event) => {
        userDetails[event.target.id] = event.target.value;
        const {id, value} = event.target;
        setUserDetails(prevUser => ({...prevUser, [id]: value}))       
    }
    const navigateToWorkflows = () => {
        setNavigateToWorkflowsRoute(true);
    }
    if (navigateToWorkflowsRoute === true) {
        localStorage.setItem('workflows', JSON.stringify([]));
        return <Redirect to='/workflows' />
    }
    return [
    <h2>Welcome to login page</h2>,
    <div className="login-panel">
        <p className="login-head"> Login</p>
        <InputGroup className="login-field" key="basic-addon1">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            placeholder="Username"
            id="Username"
            onChange = {getUserDetails} 
            aria-describedby="basic-addon1"
            />
      </InputGroup>
      <InputGroup className="login-field" key="basic-addon2">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon2">*</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            type="password"
            placeholder="Password"
            id="Password"
            onChange = {getUserDetails} 
            aria-describedby="basic-addon2"
        />
      </InputGroup>
      <Button className="btn-login" onClick={navigateToWorkflows} disabled = {loginDisable} key="login-btn" block>Login</Button>
    </div>
];
}