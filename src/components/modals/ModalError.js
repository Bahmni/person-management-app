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
          <Icon data="M88.6,103.5c2.3,0,4.1,0.7,5.5,2s2.1,3.1,2.1,5.2s-0.7,3.8-2.1,5.1s-3.2,2-5.5,2c-2.2,0-4.1-0.7-5.5-2 s-2.1-3-2.1-5.1s0.7-3.8,2.1-5.1C84.5,104.1,86.4,103.5,88.6,103.5z M94.2,96H83l-1.6-47.3h14.4L94.2,96z M168,142.5H8c-2.7,0-5.2-1.5-6.6-3.9c-1.3-2.4-1.2-5.3,0.2-7.6l80-127C83,1.8,85.4,0.5,88,0.5s5,1.3,6.3,3.5 l80,127c1.5,2.3,1.5,5.2,0.2,7.6C173.2,141,170.7,142.5,168,142.5z M21.6,127.5h132.8L88,22.1L21.6,127.5z" />
          <div className="modalRight">
            {this.props.text.map((t, index) => <p key={index}>{t}</p>)}
          </div>
          <div className="modalButton">
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
