import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalError.css';

class ModalError extends Component {
  handleClick(e) {
    this.props.onClose(e);
  }
  render() {
    return (
      <div className="backdrop">
        <div className="modalError">
          {this.props.children}
          <div>
            <button className="footer" onClick={e => this.handleClick(e)}>
              OK
            </button>
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
