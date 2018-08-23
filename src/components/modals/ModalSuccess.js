import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalSuccess.css';
import './Modal.css';

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
        <div className="modal modalSuccess" ref={node => (this.node = node)}>
          <div className="modalLeft modalLeftSuccess" />
          <div className="modalRight">
            {this.props.children[0]}
            {this.props.children[1]}
          </div>
        </div>
      </div>
    );
  }
}

ModalSuccess.propTypes = {
  onClick: PropTypes.func
};

export default ModalSuccess;
