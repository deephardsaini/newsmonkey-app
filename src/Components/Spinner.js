import React, { Component } from 'react';
import spinnerGif from '../spinner.gif'; 

const Spinner = ()=> {
    return (
      <div className="text-center">
        <img src={spinnerGif} alt="Loading..." />
      </div>
    );
}  

export default Spinner;    
    