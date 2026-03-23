import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreatePerson from './CreatePerson';
import PersonDashboard from './PersonDashboard';
import './HomePage.css';
import EditPerson from './EditPerson';

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
