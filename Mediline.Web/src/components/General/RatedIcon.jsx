import React from 'react';
import BaseIcon from './BaseIcon';
import '../../assets/scss/components/_rated-icon.scss';

const RatedIcon = ({ rating, borderColor = '#4CAF50' }) => {
  return (
    <div className="rated-icon" style={{ '--border-color': borderColor }}>
      <div className="avatar-wrapper">
        <BaseIcon />
      </div>
      <div className="rating-label">{rating} Rating</div>
    </div>
  );
};

export default RatedIcon;
