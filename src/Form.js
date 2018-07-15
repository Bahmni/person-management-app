import React from 'react';

class Form extends React.Component {
  state = {
    givenName: '',
    familyName: '',
    // age: ,
    gender: ''
    //       fieldErrors: {},
    //       people: [],
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      givenName: '',
      familyName: '',
      // age: ,
      gender: ''
    });
    this.props.onChange({
      familyName: '',
      givenName: '',
      gender: ''
    });
  };
  //     // create a copy using spread (keep persons immutable) + add current input value
  //     const people = [...this.state.people ];
  //     const person = this.state.fields;
  //     const fieldErrors = this.validate(person);
  //       this.setState({fieldErrors});
  //

  render() {
    return (
      <form>
        {/* given name */}
        <input
          placeholder="Given name"
          name="givenName"
          value={this.state.givenName}
          onChange={e => this.change(e)}
        />
        <br />
        {/* <span style={{ color: 'red' }}>{ this.state.fieldErrors.givenName }</span> */}
        {/* family name */}
        <input
          placeholder="Family name"
          name="familyName"
          value={this.state.familyName}
          onChange={e => this.change(e)}
        />
        <br />
        {/* <span style={{ color: 'red' }}>{ this.state.fieldErrors.familyName }</span> */}
        {/* submit */}
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}

//       if (Object.keys(fieldErrors).length) return;

//       fields: {
//         // reset fields back to empty after submit
//         givenName: '',
//         familyName: ''
//       }
//     });
//     // prevents from reloading
//     e.preventDefault();
//   };

//   validate = (person) => {
//     const errors = {};
//     if (!person.givenName) errors.givenName = 'Given Name Required';
//     if (!person.familyName) errors.familyName = 'Family Name Required';
//     return errors;
//   };

export default Form;
