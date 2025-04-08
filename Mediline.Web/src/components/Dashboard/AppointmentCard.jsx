import React from 'react';
import BaseIcon from '../common/BaseIcon';
import '../../assets/scss/components/_appointment-card.scss';

const AppointmentCard = ({ doctorName, specialization, time, type }) => {
  return (
    <div className="appointment-card">
      <BaseIcon />
      <div className="doctor-info">
        <div>{doctorName}</div>
        <div className="specialization">{specialization}</div>
      </div>
      <div className="appointment-time">
        <div>{time.date}</div>
        <div className="time">{time.time}</div>
      </div>
      <div className="appointment-type">{type}</div>
    </div>
  );
};

export default AppointmentCard;
