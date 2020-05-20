import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './loginComponent/Login';
import Workflows from './workflowsListComponent/Workflows';
import CreateWorkflow from './createWorkflowsComponent/CreateWorkflow';

function CustomeRoutes() {
  return (
    <HashRouter basename='/'>
      <Switch>
      <Redirect exact from="/" to="login" />
        <Route path="/workflowDetails">
          <CreateWorkflow />
        </Route>
        <Route path="/workflows">
          <Workflows />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
  </HashRouter>
  )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to the workflows
      </header>
      <CustomeRoutes />
    <footer className="App-footer">
      Thanks for visiting
    </footer>
    </div>
  );
}

export default App;
