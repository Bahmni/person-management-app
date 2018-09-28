import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormContainer from './containers/FormContainer';
import PersonDashboard from './containers/PersonDashboard';
import './index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/bahmni/new" exact component={FormContainer} />
          <Route path="/bahmni/search" exact component={PersonDashboard} />
          <Route path="/bahmni/" component={PersonDashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
