import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Icon from './Icon';

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
    const modalBackgroundColor = {
      backgroundColor: 'rgba(15, 113, 101, 0.65)'
    };
    return (
      <div className="backdrop" onClick={e => this.handleClick(e)}>
        <div
          className="modal"
          style={modalBackgroundColor}
          ref={node => (this.node = node)}
        >
          <Icon data="M101.834843,39.3442257 L56.1286089,85.0504593 L31.2294619,60.2206693 L21.4501312,70 L56.1286089,104.678478 L111.614173,49.1929134 L101.834843,39.3442257 Z M70,0.643044619 C31.7149606,0.643044619 0.643044619,31.7149606 0.643044619,70 C0.643044619,108.285039 31.7149606,139.356955 70,139.356955 C108.285039,139.356955 139.356955,108.285039 139.356955,70 C139.356955,31.7149606 108.285039,0.643044619 70,0.643044619 Z M70,125.485564 C39.3442257,125.485564 14.5144357,100.655774 14.5144357,70 C14.5144357,39.3442257 39.3442257,14.5144357 70,14.5144357 C100.655774,14.5144357 125.485564,39.3442257 125.485564,70 C125.485564,100.655774 100.655774,125.485564 70,125.485564 Z" />
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
