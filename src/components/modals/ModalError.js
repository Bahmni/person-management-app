import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalError.css';
import './Modal.css';

class ModalError extends Component {
  handleClick(e) {
    this.props.onClose(e);
  }

  render() {
    return (
      <div className="backdrop">
        <div className="modal modalError">
          <div className="modalLeft modalLeftError" />
          <div className="modalRight">
            {this.props.children[0]}
            {this.props.children[1]}
            <button onClick={e => this.handleClick(e)}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

ModalError.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalError;
