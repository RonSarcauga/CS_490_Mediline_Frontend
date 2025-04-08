import React from 'react';
import './PatientProfileCard.scss';
import Accordion from '../general/Accordion';
import AvatarEditable from '../general/AvatarEditable';

const PatientProfileCard = ({ patient }) => {
  return (
    <div className="patient-card">
      <AvatarEditable patient={patient}></AvatarEditable>

      <h2 className="patient-name">{patient.name}</h2>
      <p className="mrn">MRN: {patient.mrn}</p>
      <p className="demographics">
        {patient.gender} {patient.dob} ({patient.age} yrs)
      </p>

      <Accordion title="Basic Info">
        <div className="row">{patient.lastAppointment.date}</div>
        <div className="row">{patient.lastAppointment.time}</div>
        <div className="row">{patient.lastAppointment.doctor}</div>
        <div className="row">{patient.address}</div>
        <div className="row">{patient.phone}</div>
      </Accordion>

      <Accordion title="Medications">
        {patient.medications.length > 0 ? (
          patient.medications.map((med, index) => (
            <div className="row" key={index}>{med}</div>
          ))
        ) : (
          <div className="row">No medications listed.</div>
        )}
      </Accordion>

      <Accordion title="Forms">
        {patient.forms.length > 0 ? (
          patient.forms.map((form, index) => (
            <div className="row" key={index}>{form}</div>
          ))
        ) : (
          <div className="row">No forms submitted.</div>
        )}
      </Accordion>
    </div>
  );
};

export default PatientProfileCard;
