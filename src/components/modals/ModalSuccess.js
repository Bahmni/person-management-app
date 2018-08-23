import React, { Component } from 'react';
import './ModalSuccess.css';

class ModalSuccess extends Component {
  handleClick(e) {
    this.props.onClose(e);
  }

  handleOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.handleClick(e);
    }
  }
  render() {
    return (
      <div className="backdrop" onClick={e => this.handleOutsideClick(e)}>
        <div className="modalSuccess" ref={node => (this.node = node)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ModalSuccess;
