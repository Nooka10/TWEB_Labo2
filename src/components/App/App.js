import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Page from '../Page/Page';
import './App.css';
import IssueDetails from '../Issue/IssueDetails/IssueDetails';

function App() {
  return (
    <div className = "App">
      <Router>
        <div>
          <Route exact path = "/" component = {Page} />
          <Route path = "/:user/:repo/:numberIssue" component = {IssueDetails} />
        </div>
      </Router>
    </div>
  );
}

export default App;
