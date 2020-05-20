import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './loginComponent/Login';
import Workflows from './workflowsListComponent/Workflows';
import CreateWorkflow from './createWorkflowsComponent/CreateWorkflow';

function CustomeRoutes() {
  return (
    <Router>
    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
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
  </Router>
  )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to the workflows
      {/* import React, { Suspense } from 'react';

        const OtherComponent = React.lazy(() => import('./OtherComponent'));

        function MyComponent() {
          return (
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
              </Suspense>
            </div>
          );
        } */}
      </header>
      <CustomeRoutes />
    <footer className="App-footer">
      Thanks for visiting
    </footer>
    </div>
  );
}

export default App;
