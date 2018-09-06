import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar';
import './index.css';
import PersonDashboard from './containers/PersonDashboard';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/person/new" exact component={FormContainer} />
          <Route path="/search" exact component={PersonDashboard} />
          <Route path="/" component={PersonDashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
