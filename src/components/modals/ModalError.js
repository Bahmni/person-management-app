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
          <div className="modalRight">
            {this.props.children[0]}
            {this.props.children[1]}
            <button className="footer" onClick={e => this.handleClick(e)}>
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
