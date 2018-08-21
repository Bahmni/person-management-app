import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalSuccess.css';

class ModalSuccess extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    } else {
      this.onClose();
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  render() {
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className="backdrop"
        onClick={e => {
          this.onClose(e);
        }}
      >
        <div className="modalSuccess">{this.props.children}</div>
      </div>
    );
  }
}

ModalSuccess.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalSuccess;
