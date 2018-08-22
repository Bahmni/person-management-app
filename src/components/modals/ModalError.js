import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalError.css';

class ModalError extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  // const { title, paragraph } = props;

  render() {
    return (
      <div className="backdrop">
        <div className="modalError">
          <div className="modalRight">
            {this.props.children[0]}
            {this.props.children[1]}
            <button className="footer" onClick={e => this.onClose(e)}>
              OK
            </button>
          </div>
          <div className="modalLeft" />
        </div>
      </div>
    );
  }
}

export default ModalError;
