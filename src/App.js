import React, { Component } from 'react';
// import logo from '.logo.svg';
import './App.css';
import Form from './Form';

class App extends Component {
   state = {
      fields: {}
   }

  onChange =(updateValue) =>{
    this.setState({
      fields: {
        ...this.state.fields,
        ...updateValue
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Sign Up Form</h1>
        <Form onChange={fields => this.onChange(fields)}/>
        <div> 
          <p>{JSON.stringify(this.state.fields,null,2)}</p>
        </div>
      </div> 
      );
    }
  }        

export default App;


