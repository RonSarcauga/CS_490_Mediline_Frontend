import React from 'react';
import Dashboard from './Dashboard';
import RatedIcon from '../General/RatedIcon';
import ScrollableTable from '../General/ScrollableTable';
import AppointmentCard from './AppointmentCard';
import ThreeDotButton from '../General/ThreeDotButton';
import EditableUserIcon from '../General/EditableUserIcon';
import StatusLabel from '../General/StatusLabel';
import AccordionList from '../General/Accordion';

import {patientDashboardData} from '../../assets/js/const';
import '../../assets/scss/components/_patient-dashboard-home.scss';

const PatientDashboardHome = () => {
  console.log(patientDashboardData)
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const mainBody = (
    <>
    <div className="patient-dashboard">
      <div className="card top-card">
        <div className="card-header">
          <h3>Your Care Team</h3>
          <button className="small-btn">Book an Appointment</button>
        </div>
        <RatedIcon rating={doctor.rating} borderColor={doctor.borderColor} />
        <div><strong>Doctor</strong> {doctor.name}</div>
        <div>
          <strong>Status</strong>
          <StatusLabel status={doctor.status} />
        </div>
        <div><strong>Last Appointment:</strong> {doctor.lastAppointment}</div>
      </div>

      <div className="card mid-card">
        <div className="card-header">
          <h3>Checkout</h3>
        </div>
        <ScrollableTable 
          columns={["Appointment", "Doctor", "Treatment", "Total Bill", "Status"]} 
          data={checkout} 
          renderAction={() => <ThreeDotButton />} 
        />
      </div>

      <div className="card bottom-card">
        <div className="card-header">
          <h3>Upcoming Appointments</h3>
        </div>
        <div className="scrollable-list">
          {appointments.map((a, i) => (
            <AppointmentCard key={i} data={a} />
          ))}
        </div>
      </div>

      <div className="card vertical-card">
        <EditableUserIcon />
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>MRN:</strong> {user.mrn}</div>
        <div><strong>Gender:</strong> {user.gender}</div>
        <div><strong>Birthday:</strong> {user.birthday} ({user.age})</div>
        <AccordionList title="Medications" items={user.medications} />
      </div>
    </div>
    </>
  );
  return <Dashboard content = {mainBody} />;
};

export default PatientDashboardHome;
