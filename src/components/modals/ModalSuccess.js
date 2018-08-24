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
            <p>{this.props.lastCreatedPerson}</p>
            {this.props.text.map((t, index) => <p key={index}>{t}</p>)}
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
