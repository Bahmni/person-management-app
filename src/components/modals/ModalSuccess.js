import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalSuccess.css';

class ModalSuccess extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    return (
      <div className="backdrop">
        <div className="modalSuccess">
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

ModalSuccess.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalSuccess;
