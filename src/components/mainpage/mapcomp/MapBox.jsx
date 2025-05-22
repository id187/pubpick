import React from 'react';
import './MapBox.css';

const MapBox = ({ children }) => {
  return (
    <div className="mapbox">
      {children}
    </div>
  );
};

export default MapBox;