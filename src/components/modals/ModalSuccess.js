import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalSuccess.css';
import './Modal.css';

class ModalSuccess extends Component {
  // set timeout, default setting is 4 seconds
  timeout = 4000;
  componentDidMount() {
    setTimeout(() => {
      this.props.onClose();
    }, this.timeout);
  }

  handleClick(e) {
    if (!this.node.contains(e.target)) {
      this.props.onClose(e);
    }
  }

  render() {
    return (
      <div className="backdrop" onClick={e => this.handleClick(e)}>
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
  onClose: PropTypes.func.isRequired,
  text: PropTypes.array.isRequired,
  lastCreatedPerson: PropTypes.string.isRequired
};

export default ModalSuccess;
