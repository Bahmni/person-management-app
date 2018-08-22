import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalSuccess.css';
import ModalError from './ModalError';

class ModalSuccess extends Component {
  handleClick(e) {
    this.props.onClose(e);
  }

  handleOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.handleClick(e);
    }
  }

  setTimeout = () => {
    this.modalTimeout = setTimeout(this.timeOut, this.state.modalTimeout);
  };

  render() {
    return (
      <div className="backdrop" onClick={e => this.handleOutsideClick(e)}>
        <div className="modalSuccess" ref={node => (this.node = node)}>
          {this.props.children}
        </div>
        <div className="modalLeft" />
      </div>
    );
  }
}

ModalError.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ModalSuccess;
