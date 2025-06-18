import React, { Component } from 'react';
import spinnerGif from '../spinner.gif'; 

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={spinnerGif} alt="Loading..." />
      </div>
    );
  }
}  

export default Spinner;    
    