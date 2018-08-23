import React, { Component } from 'react';
import './ModalError.css';

class ModalError extends Component {
  handleClick(e) {
    this.props.onClose(e);
  }
  render() {
    return (
      <div className="backdrop">
        <div className="modalError">
          {this.props.children}
          <div>
            <button className="footer" onClick={e => this.handleClick(e)}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalError;
