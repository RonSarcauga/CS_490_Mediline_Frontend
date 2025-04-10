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
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const accordionData = [
    {
      header: 'Basic Info',
      content: (
        <>
        <div><strong>Last Appointment</strong></div>
        <div><>Date:</> {user.lastAppointment.date}</div>
        <div><>Time:</> {user.lastAppointment.time}</div>
        <div><>Doctor:</> {user.lastAppointment.doctor}</div>
        <div><strong>Address</strong></div>
        <div>{user.address}</div>
        <div><strong>Phone</strong></div>
        <div>{user.phone}</div>
        </>
      ),
    },
    {
      header: 'Medications',
      content: (
        <>
        {user.medications.length > 0 ? (
          <ul>
            {user.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        ) : (
          <div>No medications available</div>
        )}
      </>
      ),
    },
    {
      header: 'Forms',
      content: (
        <>No Forms to Show</>
      ),
    }
  ];
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
            columnKeys={["appointment", "doctor", "treatment", "totalBill", "status"]}
            data={checkout}
            renderActions={() => <ThreeDotButton />} 
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
        <div><strong>{user.name}</strong></div>
        <div><strong>MRN:</strong> {user.mrn}</div>
        <div>{user.gender} ● {user.birthday} ({user.age})</div>
        <AccordionList data = {accordionData} />
      </div>
    </div>
    </>
  );
  return <Dashboard content = {mainBody} />;
};

export default PatientDashboardHome;
