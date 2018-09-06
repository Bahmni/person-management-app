import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormContainer from './containers/FormContainer';
import PersonDashboard from './containers/PersonDashboard';
import NavBar from './components/Navbar';
import './index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/person/new" exact component={FormContainer} />
            <Route path="/search" exact component={PersonDashboard} />
            <Route path="/" component={PersonDashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
