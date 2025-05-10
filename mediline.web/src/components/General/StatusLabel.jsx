import React from 'react';
import '../../assets/scss/components/_status-label.scss';

const statusColors = {
  'Serving Patients': 'var(--clr-success-200)',
  'Not Serving Patients': 'var(--clr-warning-200)',
  'Paid': 'var(--clr-success-200)',
  'Unpaid': 'var(--clr-warning-200)',
  'In Progress': 'var(--clr-primary-700)',
  'Unsent': 'var(--clr-primary-700)',
  'Overdue': 'var(--clr-warning-600)',
  'Pending': 'var(--clr-warning-600)',
  'Collected': 'var(--clr-success-200)',
  'Error': 'var(--clr-neutral-100)',
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
