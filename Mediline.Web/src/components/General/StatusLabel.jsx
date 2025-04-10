import React from 'react';
import '../../assets/scss/components/_status-label.scss';

const statusColors = {
  'Serving Patients': '#4CAF50',
  'Not Serving Patients': '#F44336',
  'Paid': '#4CAF50',
  'Unpaid': '#F44336',
  'Error': '#000000'
};

const StatusLabel = ({ status }) => {
  const color = statusColors[status] || statusColors['Error'];

  return (
    <span className="status-label" style={{ backgroundColor: color }}>
      {status}
    </span>
  );
};

export default StatusLabel;
