import React from 'react';
import Dashboard from './Dashboard';
import RatedIcon from '../General/RatedIcon';
import ScrollableTable from '../General/ScrollableTable';
import AppointmentCard from './AppointmentCard';
import ThreeDotButton from '../General/ThreeDotButton';
import EditableUserIcon from '../General/EditableUserIcon';
import StatusLabel from '../General/StatusLabel';
import AccordionList from '../General/Accordion';
import Container, { ItemGroup } from '../General/Container';
import BaseIcon from '../General/BaseIcon';
import CommonIcon from '../General/CommonIcon';

import {patientDashboardData} from '../../assets/js/const';
import '../../assets/scss/components/_patient-dashboard-home.scss';

const PatientDashboardHome = () => {
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const accordionData = [
    {
      header: (<><CommonIcon name={'person'} />Basic Info</>),
      content: (
        <>
        <div><strong>Last Appointment</strong></div>
        <div><CommonIcon name={'calendar'} /> {user.lastAppointment.date}</div>
        <div><CommonIcon name={'clock'} /> {user.lastAppointment.time}</div>
        <div><CommonIcon name={'doctor'} /> {user.lastAppointment.doctor}</div>
        <div><strong>Address</strong></div>
        <div>{user.address}</div>
        <div><strong>Phone</strong></div>
        <div>{user.phone}</div>
        </>
      ),
    },
    {
      header: (<><CommonIcon name={'pill'} />Medications</>),
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
      header: (<><CommonIcon name={'form'} />Forms</>),
      content: (
        <>No Forms to Show</>
      ),
    }
  ];

  const mainBody = (
    <>
    <div className="patient-dashboard">
      <div className="card top-card">
        <Container 
          header={<h2 style={{ padding: '1rem' , justifyContent: 'center', alignItems: 'center' }}>Your Care Team</h2>} 
          
          content={
            <ItemGroup
              axis={false} fitParent={true} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}
              items={[
                <div key="left" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }} >
                  <RatedIcon rating={doctor.rating} borderColor={doctor.borderColor} />
                </div>,

                <ItemGroup
                  key="right"
                  axis={true}
                  fitParent={true}
                  evenSplit={true}
                  items={[
                    <ItemGroup
                      key="top" axis={false} fitParent={true}
                      items={[
                        <div key="top-left" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', padding: '1rem', minWidth: '200px'}}>
                          <div><strong>Doctor</strong> <br /> {doctor.name}</div>
                        </div>,
                        <div key="top-right" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '1rem', minWidth: '200px', flexDirection: 'column'}} >
                          <strong>Status</strong> <StatusLabel status={doctor.status} />
                        </div>
                      ]}
                    />,

                    <div key="bottom" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', padding: '1rem' }} >
                      <div> <strong>Last Appointment:</strong> <br /> <CommonIcon name={'calendar'} /> {doctor.lastAppointment.date} <CommonIcon name={'clock'} /> {doctor.lastAppointment.time} </div>
                    </div>
                  ]}
                />
              ]}
            />
          }
        />
      </div>
      <div className="card mid-card">
        <div className="card-header">
          <h3>Checkout</h3>
        </div>
        <ScrollableTable 
            columns={["Appointment", "Doctor", "Treatment", "Total Bill", "Status"]} 
            columnKeys={["appointment", "doctor", "treatment", "totalBill", "status"]}
            columnTypes = {{appointment:{ type: 'icon', iconName: 'calendar' }, doctor:{ type: 'icon', iconName: 'doctor' }, status:{ type: 'status' }}}
            data={checkout}
            renderActions={() => <ThreeDotButton />} 
        />
      </div>

      <div className="card bottom-card">
        <div className="card-header">
          <h3>Upcoming Appointments</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
