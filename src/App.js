import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreatePerson from './containers/CreatePerson';
import PersonDashboard from './containers/PersonDashboard';
import './index.css';
import EditPerson from './containers/EditPerson';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/person-management">
        <Switch>
          <Route path="/new" exact component={CreatePerson} />
          <Route path="/search" exact component={PersonDashboard} />
          <Route path="/edit/:uuid" exact component={EditPerson} />
          <Route path="/" component={PersonDashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
