import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TabIssues from '../TabIssues/TabIssues';
import './App.css';
import IssueDetails from '../Issue/IssueDetails/IssueDetails';

function App() {
  return (
    <div className = "App">
      <Router>
        <div>
          <Route exact path = "/" component = {TabIssues} />
          <Route path = "/:issue" component = {IssueDetails} />
        </div>
      </Router>
    </div>
  );
}

export default App;
