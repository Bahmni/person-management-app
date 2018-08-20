import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalError.css';

class Modal extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
          <div>
            <button
              className="footer"
              onClick={e => {
                this.onClose(e);
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;
