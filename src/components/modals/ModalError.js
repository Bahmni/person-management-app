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
            {this.props.text.map((t, index) => <p key={index}>{t}</p>)}
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
