import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';
import NavBar from './components/Navbar';
import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <FormContainer />
      </div>
    );
  }
}

export default App;
