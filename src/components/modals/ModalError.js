import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Icon from './Icon';

class ModalError extends Component {
  handleClick(e) {
    this.props.onClose(e);
  }
  render() {
    const modalBackgroundColor = {
      backgroundColor: 'rgba(217, 89, 88, 0.65)'
    };
    return (
      <div className="backdrop">
        <div className="modal" style={modalBackgroundColor}>
          <Icon icon="attention" />
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
  onClose: PropTypes.func.isRequired,
  text: PropTypes.array.isRequired
};

export default ModalError;
