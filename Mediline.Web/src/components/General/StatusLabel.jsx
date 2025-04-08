import React from 'react';
import '../../assets/scss/components/_status-label.scss';

const StatusLabel = ({ status, color }) => {
  return (
    <span className="status-label" style={{ backgroundColor: color }}>
      {status}
    </span>
  );
};

export default StatusLabel;
