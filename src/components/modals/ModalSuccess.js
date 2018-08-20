import React, { Component } from 'react';
// import PropTypes from "prop-types";
import './Modal.css';

class ModalSuccess extends Component {
  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modalSuccess">
          {this.props.children}
          <div />
        </div>
      </div>
    );
  }
}

// ModalSuccess.propTypes = {
//   onClose: PropTypes.func.isRequired
// };

export default ModalSuccess;
